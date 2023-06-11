# Check if PostgreSQL service is running, and start it if it's not running
$service = Get-Service -Name postgresql -ErrorAction SilentlyContinue
if ($service -eq $null) {
    Start-Service -Name postgresql
}

# Navigate to the express backend directory
$backendPath = "\expressjs-backend"
Set-Location -Path $backendPath

# Run the express backend using npm start
Start-Process -FilePath "npm" -ArgumentList "start" -Wait

# Navigate to the angular project directory
$angularPath = "\angular-accounting"
Set-Location -Path $angularPath

# Check if the angular app is already running
$runningApps = Get-Process | Where-Object { $_.MainWindowTitle -match "angular-accounting" }
if ($runningApps.Count -eq 0) {
    # Run ng build to build the angular project
    Start-Process -FilePath "ng" -ArgumentList "build" -Wait

    # Open the app in the default browser or Edge specifically
    $browser = "msedge" # Change this to "chrome" or "firefox" if needed
    Start-Process -FilePath "$browser" -ArgumentList "file:///$angularPath/dist/angular-accounting/index.html"
}
