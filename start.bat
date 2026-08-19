@echo off
REM PathForge AI - Quick Start Script for Windows

echo ==================================
echo    PATHFORGE AI - Starting...
echo ==================================
echo.

REM Check if Java is installed
where java >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Java is not installed.
    echo Please install Java 17 or higher.
    pause
    exit /b 1
)

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js is not installed.
    echo Please install Node.js 18 or higher.
    pause
    exit /b 1
)

echo Starting Backend...
cd backend
start /B mvnw.cmd spring-boot:run

echo Waiting for backend to start...
timeout /t 10 /nobreak >nul

echo.
echo Starting Frontend...
cd ..\frontend
start /B npm run dev

echo.
echo ==================================
echo    PATHFORGE AI is running!
echo ==================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8080
echo.
echo Press any key to stop...
pause >nul
