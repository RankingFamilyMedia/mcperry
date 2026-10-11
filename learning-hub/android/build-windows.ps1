$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
# Requires JDK 17 and Android SDK (SDK path in local.properties or ANDROID_HOME).
$version = '8.9'
$dir = Join-Path $PSScriptRoot '.tools'
New-Item -ItemType Directory -Force $dir | Out-Null
$gradle = Join-Path $dir "gradle-$version\bin\gradle.bat"
if (!(Test-Path $gradle)) {
  $zip = Join-Path $dir 'gradle.zip'
  Invoke-WebRequest "https://services.gradle.org/distributions/gradle-$version-bin.zip" -OutFile $zip
  Expand-Archive $zip $dir -Force
}
& $gradle assembleDebug
if ($LASTEXITCODE -ne 0) { throw 'Android build failed.' }
Write-Host 'APK: app\build\outputs\apk\debug\app-debug.apk'

