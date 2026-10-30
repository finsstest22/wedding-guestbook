@echo off
chcp 65001 > nul
cd /d "%~dp0"
start "" http://localhost:3000/screen.html
node server.js
pause
