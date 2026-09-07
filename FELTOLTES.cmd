@echo off
chcp 65001 > nul
title VL photo - feltoltes
cd /d "%~dp0"

echo.
echo  ================================================
echo   VL photo - feltoltes Cloudflare Pages-re
echo  ================================================
echo.
echo   1. lepes: bejelentkezes
echo.
echo   Most megnyilik a bongeszo a Cloudflare oldalan.
echo   Kattints az "Allow" gombra, aztan gyere vissza ide.
echo   Ha mar be vagy jelentkezve, ezt atugorhatod.
echo.
pause

call npx wrangler login

echo.
echo  ------------------------------------------------
echo   2. lepes: a feltoltendo mappa elkeszitese
echo  ------------------------------------------------
call npm run deploy
if errorlevel 1 goto hiba

echo.
echo  ------------------------------------------------
echo   3. lepes: feltoltes (162 fajl, kb. 22 MB)
echo  ------------------------------------------------
call npx wrangler pages deploy deploy --project-name vl-photo --branch main
if errorlevel 1 goto hiba

echo.
echo  ================================================
echo   KESZ. A fenti cimen elerheto az oldal.
echo  ================================================
echo.
pause
exit /b 0

:hiba
echo.
echo  ELAKADT. Masold ki a fenti hibauzenetet.
echo.
pause
exit /b 1
