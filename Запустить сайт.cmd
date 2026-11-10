@echo off
chcp 65001 >nul
title Содействие — сайт (не закрывайте это окно)
cd /d "%~dp0"

if not exist "dist-tunnel\index.html" (
  echo Сначала соберите сайт:  npm run build:tunnel
  pause
  exit /b 1
)

".venv\Scripts\python.exe" serve.py
echo.
echo Сайт остановлен.
pause >nul
