# Set the path to the script and the corresponding directories
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path -Path $scriptPath -ChildPath "expressjs-backend"
$angularPath = Join-Path -Path $scriptPath -ChildPath "angular-accounting"

# Check if PostgreSQL service is running, and start it if it's not running
$service = Get-Service -Name postgresql -ErrorAction SilentlyContinue
if ($service -eq $null) {
    Start-Service -Name postgresql
}

# Navigate to the express backend directory
Set-Location -Path $backendPath

# Check if the express server is already running
$expressRunning = Test-NetConnection -ComputerName localhost -Port 3000 -InformationLevel Quiet
if (-not $expressRunning) {
    # Run the express backend using npm start in a new terminal window
    Start-Process -FilePath "npm" -ArgumentList "start" -WindowStyle Hidden
}

# Navigate to the angular project directory
Set-Location -Path $angularPath

# Check if the angular app is already running
$angularRunning = Get-Process | Where-Object { $_.MainWindowTitle -match "angular-accounting" }
if ($angularRunning.Count -eq 0) {
    # Run ng build to build the angular project
    Start-Process -FilePath "ng" -ArgumentList "build" -Wait

    # Open the app in the default browser or Edge specifically
    $browser = "msedge" # Change this to "chrome" or "firefox" if needed
    Start-Process -FilePath "$browser" -ArgumentList "file:///$angularPath/dist/angular-accounting/index.html"
}
