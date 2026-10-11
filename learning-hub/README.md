# McPerry Learning Hub

BECE and SHS learning app + shared API + Windows Teacher Studio source project.

**Start here:** docs/SETUP.md contains the Windows setup, account assignment, content import, AI configuration, Android build and CMS EXE build steps, plus the release limitations.

- backend/server.py — no-dependency Python server, SQLite database and API.
- backend/static — responsive student app and role-aware teacher/admin CMS.
- desktop — Windows EXE build project using pywebview.
- android — Android Studio native app project with WebView and PiP bridge.
- docs/import-template.json — sample question-import structure.
- tests — backend authorization and learning-flow tests.

Version 0.2.0 is a pilot release candidate. Compiled EXE/APK, hosting and full past-paper content are not included. There are two clearly labelled original sample questions. No API keys or production credentials are bundled.

The current release candidate adds owner/teacher usage statistics in the CMS, Windows-safe SQLite connection handling, Android release-signing configuration, a launcher icon, and GitHub CI checks. See docs/RELEASE-CHECKLIST.md before hosting or submitting to Google Play.

Created for Captain Perrygrino Nelson / McPerry Imaginations.

