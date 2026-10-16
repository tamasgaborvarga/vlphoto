@echo off
chcp 65001 > nul
cd /d "%~dp0"

rem A "B" valtozat megnyitasa (papirfeher, szamozott fejezetek).
rem Duplakattintasra mukodik: a JS es a CSS bele van agyazva a HTML-be.

if not exist "deploy\b.html" (
  echo Meg nincs deploy mappa, elkeszitem...
  call npm run deploy
)

start "" "%~dp0deploy\b.html"
