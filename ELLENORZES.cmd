@echo off
chcp 65001 > nul
title VL photo - helyi ellenorzes
cd /d "%~dp0"

echo.
echo  VL photo - a feltoltendo deploy mappa helyi ellenorzese
echo  ------------------------------------------------------
echo.
echo  Ez ugyanazt a mappat szolgalja ki, amit a Cloudflare-re feltoltesz.
echo  A bongeszo mindjart megnyilik. Bezarashoz: Ctrl+C, vagy zard be ezt az ablakot.
echo.

start "" "http://127.0.0.1:4300"
call npm run deploy:check
