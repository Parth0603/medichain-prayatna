@echo off
echo ========================================
echo    MediChain - Starting Application
echo ========================================
echo.

echo [1/3] Killing any existing Node processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/3] Starting Backend Server (Port 5000)...
start "MediChain Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul

echo [3/3] Starting Frontend Server (Port 3000)...
start "MediChain Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo    MediChain is Starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak >nul

start http://localhost:3000

echo.
echo ========================================
echo    Application Started Successfully!
echo ========================================
echo.
echo To stop the servers, close the terminal windows
echo or press Ctrl+C in each window.
echo.
pause
