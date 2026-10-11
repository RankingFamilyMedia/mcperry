$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

$androidStudioJbr = 'C:\Program Files\Android\Android Studio\jbr'
if (Test-Path (Join-Path $androidStudioJbr 'bin\java.exe')) {
    $env:JAVA_HOME = $androidStudioJbr
}
$gradle = Join-Path $PSScriptRoot '.tools\gradle-8.11.1\bin\gradle.bat'
$keytool = Join-Path $env:JAVA_HOME 'bin\keytool.exe'
$keystore = Join-Path $PSScriptRoot 'mcperry-upload.jks'
$alias = 'mcperry-upload'

if (!(Test-Path $keytool)) { throw "JDK keytool not found. Set JAVA_HOME to a JDK 17 or 21 installation." }
if (!(Test-Path $gradle)) { throw 'Gradle 8.11.1 is missing. Run the Android build bootstrap first.' }

if (!(Test-Path $keystore)) {
    Write-Host 'Creating the upload keystore. Choose and record both passwords securely.'
    & $keytool -genkeypair -v -keystore $keystore -alias $alias -keyalg RSA -keysize 2048 -validity 10000 -storetype PKCS12 -dname 'CN=McPerry Learning Hub, O=McPerry Imaginations, C=GH'
    if ($LASTEXITCODE -ne 0) { throw 'Keystore creation failed.' }
}

function Read-SecretText([string]$Prompt) {
    $secure = Read-Host $Prompt -AsSecureString
    $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try { return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) }
    finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
}

$env:MCPERRY_STORE_FILE = $keystore
$env:MCPERRY_STORE_PASSWORD = Read-SecretText 'Keystore password'
$env:MCPERRY_KEY_ALIAS = $alias
$env:MCPERRY_KEY_PASSWORD = Read-SecretText 'Key password'
try {
    & $gradle bundleRelease --no-daemon
    if ($LASTEXITCODE -ne 0) { throw 'Signed Android App Bundle failed.' }
} finally {
    Remove-Item Env:MCPERRY_STORE_FILE,Env:MCPERRY_STORE_PASSWORD,Env:MCPERRY_KEY_ALIAS,Env:MCPERRY_KEY_PASSWORD -ErrorAction SilentlyContinue
}
Write-Host "Signed AAB: $PSScriptRoot\app\build\outputs\bundle\release\app-release.aab"

