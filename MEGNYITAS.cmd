@echo off
chcp 65001 > nul
cd /d "%~dp0"

if not exist "deploy\index.html" (
  echo Meg nincs deploy mappa, elkeszitem...
  call npm run deploy
)

start "" "%~dp0deploy\index.html"
