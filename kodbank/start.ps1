# Start both backend and frontend servers

Write-Host "🚀 Starting Kodbank Application..." -ForegroundColor Cyan
Write-Host ""

# Function to display header
function Show-Banner {
    Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host "          KODBANK - BANKING APPLICATION" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host ""
}

Show-Banner

# Check if directories exist
$backendPath = ".\backend"
$frontendPath = ".\frontend"

if (-not (Test-Path $backendPath)) {
    Write-Host "❌ Backend directory not found!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $frontendPath)) {
    Write-Host "❌ Frontend directory not found!" -ForegroundColor Red
    exit 1
}

# Start backend server in a new window
Write-Host "📦 Starting Backend Server (Port 5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $backendPath; npm run dev" -WindowStyle Normal

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend server in a new window
Write-Host "⚛️  Starting Frontend Server (Port 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $frontendPath; npm start" -WindowStyle Normal

Write-Host ""
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Tip: The frontend will auto-open in your browser when ready" -ForegroundColor Magenta
Write-Host ""
