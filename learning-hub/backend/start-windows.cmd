@echo off
cd /d "%~dp0"
if "%OWNER_EMAIL%"=="" set /p OWNER_EMAIL=Owner email:
if "%OWNER_PASSWORD%"=="" (
echo Set OWNER_PASSWORD in your environment to a strong password of 12 or more characters.
pause
exit /b 1
)
py -3 server.py
pause

