# McPerry Learning Hub â€” setup and release guide

This ZIP contains the McPerry Learning Hub release candidate, version 0.2.1. It has a mobile-friendly student web app, an Android native WebView project, a Windows desktop CMS client project, and a shared Python API/database. A local CMS EXE can be built from the desktop project; hosting, signing, and a complete WAEC archive still require release setup.

## 1. Run the shared server on your Windows PC

Install Python 3.12 or newer. Extract the ZIP. Open PowerShell inside the project folder:

```powershell
$env:OWNER_EMAIL = 'your-email@example.com'
$env:OWNER_PASSWORD = 'choose-a-long-private-password'
python .\backend\server.py
```

Visit http://127.0.0.1:8080/cms and sign in with those credentials. The student app is http://127.0.0.1:8080/. No backend pip packages are needed. The server requires these variables on first initialization only. Changing OWNER_PASSWORD afterwards does not reset an existing account. Use the Password button after signing in.

The data folder is backend/data. Back up the database using Python's SQLite backup API or stop the server before copying the database and all uploaded media. Keep the backup private. Do not include your real database or keys in source ZIPs.

## 2. Create student and teacher accounts

In CMS, open â€œCreate a teacher or student accountâ€. Add name, email, a unique temporary password of at least 12 characters, and role. Users can change their password using the Password button. There is no public signup in this version; the owner controls admission.

Assign a teacher to a topic to allow questions, answers and tutorial submissions within that topic. Or assign a specific question as an answer task without granting the whole topic. Revoke assignments or disable an account when needed. The server checks permissions on every write; hiding a form is not the permission boundary.

Teacher submissions remain pending until the owner approves. Owner-created answers are reviewed, and owner tutorials can be published immediately. Specific question tasks grant question/answer access; posting tutorials and uploading videos requires the matching topic assignment.

## 3. Load real questions

Only two original sample questions and answers are initially seeded. Nine BECE/SHS topics are included as a starting taxonomy; add any subject or topic through CMS. The SHS bank supports core and elective subjects through this same taxonomy.

Use the question form or JSON importer with docs/import-template.json. Match topic_id values to your own database. answer_index is zero-based in JSON (the CMS form uses 1-based numbers). null means the correct option is unknown. year null indicates practice. Keep the source and reproduction authorization reference with each paper. This package does not download, license or supply all BECE/WASSCE papers. Scanned PDF/OCR importing and question diagrams are future work; this version imports text questions and options.

Imports run one item at a time and report where they stop. Successful items are already saved; remove them from the file before retrying. Each teacher import is still subject to topic restrictions and approval.

The administrator and assigned teachers can open Usage & activity in the CMS. Administrators see aggregate student activity, content totals, reports, and teacher assignment/submission activity. Teachers see aggregate totals limited to their assigned topics and question tasks; individual student identities are not exposed.

## 4. Enable AI explanations

Before starting the backend, set server environment variables:

```powershell
$env:OPENAI_API_KEY = 'your-provider-key'
$env:OPENAI_MODEL = 'gpt-4.1-mini'
$env:AI_DAILY_LIMIT = '100'
python .\backend\server.py
```

An API account and provider billing are separate from a ChatGPT subscription. Keep keys on the server. Change the model to one available to your API account. Live provider calls could not be tested without your key.

The app requests hint, step-by-step or full explanation on demand. Matching reviewed answers are preferred, then matching cached AI answers. New explanations are saved against question ID, version and mode. AI text is shown with â€œnot teacher-reviewedâ€. The owner can approve or withdraw it. Editing a question increments its version, leaving previous explanations in the database as history; old explanations are not served for the new version.

Quota: ten new generations per account per 24-hour window plus the global cap. Cached answers do not consume generation quota. Failed generation attempts consume a quota reservation. The model receives question content and subject/topic, not student passwords or names. Concurrent requests may generate duplicate explanations; a production job queue/deduplication lock is a future hardening task.

Explanations are plain text with readable mathematical notation, and read-aloud uses the device's speech synthesis. This version does not generate images, audio files, rendered LaTeX or multi-turn tutor chat.

## 5. Build the Windows desktop CMS EXE

On Windows 10/11 with Python 3.12 and internet access, double-click desktop/build-windows.cmd. It creates a virtual environment, installs pywebview and PyInstaller, and builds:

```
desktop\dist\McPerryTeacherStudio.exe
```

The EXE connects to the shared server; it does not host the backend or have a separate copy of the database. Every teacher installs the client and uses their own account. Microsoft Edge WebView2 Runtime must be available. First launch asks for the server address. Use localhost for a local trial or HTTPS for remote teachers.

To change the saved desktop server, close the CMS and delete %APPDATA%\McPerryLearningHub\cms.json. The client intentionally uses a private browser session; sign in each launch.

The EXE was not compiled here: this environment has neither Windows nor Wine. This is an executable build project, not an included .exe. EXE signing, installer creation and Windows device testing remain release tasks.

## 6. Build and install the Android app

Install Android Studio, Android SDK 35 and JDK 17. Open the android folder in Android Studio and let it sync. Build > Build APK(s) to create a debug APK. Alternatively, from PowerShell in android:

```powershell
.\build-windows.ps1
```

If scripts are blocked, use Android Studio rather than weakening machine-wide script policy. The script downloads Gradle 8.11.1 and requires SDK location configured in local.properties or ANDROID_HOME. Debug APK output:

```
android\app\build\outputs\apk\debug\app-debug.apk
```

The app asks for your hosted HTTPS server address. It deliberately does not accept an unencrypted remote address. Use the browser for the localhost trial, then host with HTTPS for phone testing. Long-press the Android screen to change server. Android source uses package com.mcperry.learn; change this before publication if desired.

For Play release, create a release keystore and generate a signed AAB through Android Studio. No signing key is included. APK/AAB compilation and Android device verification have not run here because the Android SDK is unavailable.

The web app also runs directly in a mobile browser. Offline shell and downloaded catalog caching work on HTTPS/localhost; it is a basic installable-web-app manifest without finished store icon assets.

## 7. Videos and picture-in-picture

Teachers add YouTube watch/share/shorts links, upload MP4 videos up to 30 MB, or attach a PDF revision pack up to 20 MB. The server checks topic permission and normalizes supported YouTube links to embed URLs. Video and PDF resources become visible/downloadable only when the post is published; each PDF requires a source or rights reference. This is basic container validation, not transcoding or malware scanning. Keep a controlled teacher roster. Large videos should use YouTube.

Teacher benefit and YouTube policy: the CMS shows each teacher how approved questions, topic lessons, videos and PDFs are credited. The owner can record actual monthly channel revenue allocations in the auditable wallet ledger with teacher, period, source, eligible views, participation units, percentage and amount. Do not pay viewers, require watch time, or promise a fixed amount per view: YouTube prohibits engagement whose primary purpose is financial gain, and ad revenue is not guaranteed. Teachers must receive the written revenue-share terms and payout schedule before contributing. Wallet entries are records of credits; external payout execution still requires the agreed payment process.

The student app keeps lessons in a floating in-app player while the question remains accessible. Closing the player ends it. For uploaded MP4 videos, the web PiP button requests system PiP when supported. The Android native bridge also requests system PiP and adjusts the view to the lesson player. YouTube remains an official iframe embed: playback/PiP depends on device, WebView, embedding permissions and video restrictions. This feature needs testing on actual Android phones; continuous background playback is not promised. No YouTube videos are downloaded or extracted. Fullscreen handling in the Android wrapper is a future enhancement; use the floating view for now.

## 8. Shared deployment

A PC-local server is only accessible on that PC by default. Teachers elsewhere need a hosted server; the desktop EXE and Android app should use the same HTTPS origin.

For a small pilot, deploy the backend container with a persistent /data volume and a managed HTTPS reverse proxy. Provide OWNER_EMAIL / OWNER_PASSWORD securely on first start and OPENAI_API_KEY only if desired. Never expose the SQLite file or data directory as static files. The Dockerfile runs as a non-root user; ensure the mounted volume is writable by UID 10001. Configure request size and upstream timeout in the reverse proxy for 30 MB uploads and 90-second AI calls.

This uses Python's ThreadingHTTPServer and SQLite for a limited pilot. Before wide public production use, migrate HTTP handling to a production server/framework, add centralized monitoring, per-user media authorization where required, verified backups, durable task deduplication, object storage/transcoding, and a reviewed privacy policy for student accounts. It has session expiry, password hashing, role/topic checks, rate limits and an audit trail, but no email recovery, MFA, public enrollment, school tenancy or push notifications.

## 9. Student learning features included

- BECE / SHS separation; subjects, topics, year/text search.
- Question beside a working area and on-demand explanations on desktop; stacked mobile layout.
- Hints, worked reasoning and full solutions, reusable from the server.
- Multiple-choice attempt feedback if a correct option has been entered; written answers saved without automated grading.
- Personal bookmarks, local working notes, basic per-topic attempt totals.
- Reviewed answers and clearly labelled unreviewed AI explanations.
- Text tutorials, YouTube and uploaded lesson videos, floating player.
- Device read-aloud when available; student error reports to owner.
- Cached questions and explanations for basic offline review on the same device. Sign-out clears the catalog, bookmarks, solutions and working notes for that account. Video streaming and new AI generations require internet. Cached content can be stale until the next online refresh.

Not yet included: full past-paper archive, timed mock exams, automatic essay marking, mastery scoring, push notifications, teacher review delegation to other reviewers, PDF question extraction, attachments, or payments. These should be added after the pilot flow is tested with your teachers.

## 10. Validation

From the project folder:

```powershell
python -m unittest discover -s tests -v
```

Backend tests cover authorization boundaries, publication, specific-question tasks, answer caching/versioning, account disablement, uploads, attempts, login throttling, and YouTube URL validation. JavaScript syntax was checked with Node. The mocked AI test verifies cache behavior, not live answer accuracy. Visual/browser verification, compiled Android/Windows tests, and real YouTube playback remain outstanding; local headless browser binaries are absent in the build environment.

