"""Windows desktop CMS client. Connects to the shared hosted Learning Hub."""
import json, os, tkinter as tk
from tkinter import simpledialog, messagebox
from pathlib import Path
from urllib.parse import urlsplit
import webview

CONFIG = Path(os.getenv('APPDATA', str(Path.home()))) / 'McPerryLearningHub' / 'cms.json'
DEFAULT_SERVER = 'https://app.oneafrikanvoice.art'
def main():
    root=tk.Tk(); root.withdraw()
    try: url=json.loads(CONFIG.read_text())['server']
    except (OSError,ValueError,KeyError): url=''
    if not url:
        url=simpledialog.askstring('McPerry Teacher Studio','Enter your Learning Hub server address.\nExample: https://learn.yourdomain.com\nLocal testing: http://127.0.0.1:8080',initialvalue=DEFAULT_SERVER,parent=root)
        if not url: return
        p=urlsplit(url)
        if p.scheme!='https' and not (p.scheme=='http' and p.hostname in ('127.0.0.1','localhost')):
            messagebox.showerror('Invalid address','Use HTTPS, or localhost for testing.');return
        if not p.hostname or p.username or p.password or p.query or p.fragment:
            messagebox.showerror('Invalid address','Enter a plain server origin without credentials or query parameters.');return
        CONFIG.parent.mkdir(parents=True,exist_ok=True);CONFIG.write_text(json.dumps({'server':url.rstrip('/')}))
    root.destroy()
    webview.create_window('McPerry Teacher Studio',url.rstrip('/')+'/cms',width=1280,height=900,min_size=(900,650))
    webview.start(gui='edgechromium',private_mode=True)
if __name__=='__main__': main()

