"""Passenger/WSGI entry point for cPanel deployments.

The local development server in backend/server.py uses BaseHTTPRequestHandler.
Passenger cannot host that listener directly, so this adapter exposes the same
API and static files as a WSGI application.
"""
import json
import mimetypes
import os
import re
import sys
import threading
from pathlib import Path
from urllib.parse import parse_qs

APP_ROOT = Path(__file__).resolve().parent
BACKEND = APP_ROOT / 'backend'


def _load_config_file():
    """Load deployment settings from a private file outside the web root."""
    config_path = Path(os.getenv('MCPERRY_CONFIG', str(APP_ROOT.parent / 'mcperry-config.env')))
    if not config_path.is_file():
        return
    for line in config_path.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        key, value = line.split('=', 1)
        key, value = key.strip(), value.strip()
        if key in {'OWNER_EMAIL', 'OWNER_PASSWORD', 'LEARN_DATA', 'OPENAI_API_KEY', 'OPENAI_MODEL', 'AI_DAILY_LIMIT'}:
            os.environ.setdefault(key, value)


_load_config_file()
if str(BACKEND) not in sys.path:
    sys.path.insert(0, str(BACKEND))

import server  # noqa: E402

_initialize_lock = threading.Lock()
_initialized = False


def _ensure_initialized():
    global _initialized
    if _initialized:
        return
    with _initialize_lock:
        if not _initialized:
            if not os.getenv('OWNER_PASSWORD') or not os.getenv('OWNER_EMAIL'):
                raise server.Problem(500, 'Set OWNER_EMAIL and OWNER_PASSWORD in the cPanel application settings.')
            server.initialize()
            _initialized = True


def _response(start_response, status, body=b'', content_type='text/plain; charset=utf-8', headers=None):
    if isinstance(body, str):
        body = body.encode('utf-8')
    output_headers = [
        ('Content-Type', content_type),
        ('Content-Length', str(len(body))),
        ('X-Content-Type-Options', 'nosniff'),
    ]
    if headers:
        output_headers.extend(headers)
    start_response(status, output_headers)
    return [body]


def _json(start_response, status, value):
    return _response(
        start_response,
        f'{status} ' + {200: 'OK', 400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 405: 'Method Not Allowed', 409: 'Conflict', 413: 'Request Entity Too Large', 416: 'Range Not Satisfiable', 429: 'Too Many Requests', 500: 'Internal Server Error', 502: 'Bad Gateway', 503: 'Service Unavailable'}.get(status, 'Error'),
        json.dumps(value),
        'application/json; charset=utf-8',
        [('Cache-Control', 'no-store')],
    )


def _input(environ):
    query = parse_qs(environ.get('QUERY_STRING', ''), keep_blank_values=True)
    data = {key: values[0] for key, values in query.items()}
    if environ['REQUEST_METHOD'] == 'POST':
        try:
            length = int(environ.get('CONTENT_LENGTH') or '0')
        except ValueError:
            raise server.Problem(400, 'Invalid request length.')
        if length < 0 or length > 42 * 1024 * 1024:
            raise server.Problem(413, 'Request too large.')
        raw = environ['wsgi.input'].read(length)
        try:
            data = json.loads(raw or b'{}')
        except json.JSONDecodeError:
            raise server.Problem(400, 'Invalid JSON request.')
        if not isinstance(data, dict):
            raise server.Problem(400, 'JSON object required.')
    return data


def _static(start_response, path):
    if path == '/':
        name = 'index.html'
    elif path == '/cms':
        name = 'cms.html'
    elif path == '/privacy':
        name = 'privacy.html'
    elif path in ('/account-deletion', '/deletion'):
        name = 'account-deletion.html'
    else:
        name = path.lstrip('/')
    if name not in {'index.html', 'cms.html', 'privacy.html', 'account-deletion.html', 'app.js', 'style.css', 'manifest.json', 'sw.js'}:
        return _json(start_response, 404, {'error': 'Not found.'})
    file = server.ROOT / 'static' / name
    if not file.is_file():
        return _json(start_response, 404, {'error': 'Not found.'})
    content_type = mimetypes.guess_type(str(file))[0] or 'application/octet-stream'
    return _response(
        start_response,
        '200 OK',
        file.read_bytes(),
        content_type,
        [
            ('Cache-Control', 'no-cache' if name.endswith(('.html', '.js', '.css')) else 'public, max-age=3600'),
            ('Referrer-Policy', 'strict-origin-when-cross-origin'),
            ('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; frame-src https://www.youtube.com; media-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"),
        ],
    )


def application(environ, start_response):
    """Passenger entry point configured in cPanel as ``application``."""
    method = environ.get('REQUEST_METHOD', 'GET').upper()
    path = environ.get('PATH_INFO', '/') or '/'
    try:
        _ensure_initialized()
        if path.startswith('/api/'):
            token = ''
            auth = environ.get('HTTP_AUTHORIZATION', '')
            if auth.startswith('Bearer '):
                token = auth[7:]
            result = server.api(method, path, _input(environ), token, environ.get('REMOTE_ADDR', 'unknown'))
            return _json(start_response, 200, result)
        if method != 'GET':
            raise server.Problem(405, 'Method not allowed.')
        if path.startswith('/media/'):
            name = path.rsplit('/', 1)[-1]
            if not re.fullmatch(r'[a-f0-9]{32}\.mp4', name):
                raise server.Problem(404, 'Not found.')
            with server.database() as c:
                if not c.execute('SELECT 1 FROM posts WHERE video=? AND status="published"', (path,)).fetchone():
                    raise server.Problem(404, 'Video is not published yet.')
            file = server.DATA / 'media' / name
            if not file.is_file():
                raise server.Problem(404, 'Not found.')
            return _response(start_response, '200 OK', file.read_bytes(), 'video/mp4', [('Accept-Ranges', 'bytes')])
        return _static(start_response, path)
    except server.Problem as error:
        return _json(start_response, error.status, {'error': error.message})
    except (ValueError, TypeError, KeyError):
        return _json(start_response, 400, {'error': 'Invalid request values.'})
    except Exception:
        return _json(start_response, 500, {'error': 'Server error. Contact the administrator.'})

