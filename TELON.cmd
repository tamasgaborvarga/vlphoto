@echo off
chcp 65001 > nul
title VL photo - megnezes telefonon
cd /d "%~dp0"

echo.
echo  ================================================
echo   VL photo - megnezes telefonon
echo  ================================================
echo.
echo   1. A telefon ES a gep ugyanazon a Wi-Fi-n legyen.
echo   2. A telefon bongeszojebe ird be:
echo.
echo        http://192.168.1.114:4400
echo.
echo   Ha nem tolt be, a Windows tuzfal kerhet engedelyt -
echo   engedelyezd a "Magánhálózat" opciot.
echo.
echo   Leallitas: Ctrl+C, vagy zard be ezt az ablakot.
echo  ================================================
echo.

call npm run telon
