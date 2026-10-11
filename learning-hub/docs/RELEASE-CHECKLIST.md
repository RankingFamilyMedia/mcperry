# McPerry Learning Hub release checklist

## Web hosting

- Host the Python API and persistent SQLite/media data on a server that supports a long-running Python process or container.
- Point the public API origin to HTTPS before connecting the Android app.
- Use `oneafrikanvoice.art` only after its DNS records point to the chosen host. The Sites static publisher cannot run `backend/server.py` or persist SQLite by itself.
- Set `OWNER_EMAIL`, `OWNER_PASSWORD`, and optionally `OPENAI_API_KEY` as deployment secrets. Never commit them.
- Back up `backend/data/learning.db` and `backend/data/media/` before importing real student content.

## CMS and usage control

- `/cms` includes administrator usage totals and assigned-teacher activity.
- Teachers see only aggregate activity for their assigned topics/questions; student identities are not exposed.
- Teacher Studio clearly explains contribution credit, authentic YouTube revenue eligibility, and PDF revision-pack downloads.
- Owner-only wallet entries record verified source, period, teacher, eligible views, participation units, share percentage and amount; teachers can view only their own entries.
- PDF resources have an owner-approved source/rights reference and are served only after the lesson is published.
- The Windows EXE is a private WebView client for the shared CMS; it does not contain the database.

## Android signing

Keep the upload keystore outside GitHub. For a release AAB, set these environment variables in the build shell:

```powershell
$env:MCPERRY_STORE_FILE = 'C:\secure\mcperry-upload.jks'
$env:MCPERRY_STORE_PASSWORD = 'use-a-secret-manager'
$env:MCPERRY_KEY_ALIAS = 'mcperry-upload'
$env:MCPERRY_KEY_PASSWORD = 'use-a-secret-manager'
.\gradlew.bat bundleRelease
```

If the variables are missing, the project can still build debug artifacts, but the release artifact is not ready for Google Play upload. Enrol the app in Google Play App Signing and keep a separate backup of the upload keystore.

## Phone test

- Enable Developer options and USB debugging on the Android phone.
- Connect the phone and verify it appears in `adb devices`.
- Install the debug APK with `adb install -r app\build\outputs\apk\debug\app-debug.apk`.
- Test login, question attempts, offline review, AI fallback, videos, PiP, CMS permissions, and disabled-account behavior on a real device.
- Test published YouTube lessons, uploaded MP4 lessons, published PDF downloads, and rejection of unpublished resources.

## Google Play submission

- Upload the signed AAB, not the debug APK.
- Complete the store listing, privacy-policy URL, Data Safety form, target audience, content rating, app access instructions, and screenshots.
- Use closed testing first. Do not claim production readiness until the hosted API, real phone, signed AAB, and teacher workflows have passed acceptance testing.

