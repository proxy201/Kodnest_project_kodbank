@echo off
REM Kodbank - Start Both Frontend and Backend

echo.
echo ============================================
echo     KODBANK - BANKING APPLICATION
echo ============================================
echo.

echo Starting Backend Server (Port 5000)...
start cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak

echo Starting Frontend Server (Port 3000)...
start cmd /k "cd frontend && npm start"

echo.
echo ✓ Both servers are starting!
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause
