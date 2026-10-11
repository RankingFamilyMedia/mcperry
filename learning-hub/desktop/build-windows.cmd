@echo off
setlocal
cd /d "%~dp0"
py -3 -m venv .venv
if errorlevel 1 goto fail
.venv\Scripts\python -m pip install -r requirements.txt
if errorlevel 1 goto fail
.venv\Scripts\python -m PyInstaller --noconfirm --clean --onefile --windowed --name McPerryTeacherStudio cms.py
if errorlevel 1 goto fail
echo Built: %CD%\dist\McPerryTeacherStudio.exe
pause
exit /b 0
:fail
echo Build failed. Install Python 3.12 on Windows and check your internet connection.
pause
exit /b 1

