@echo off
echo ========================================
echo   ZEK BRIDGE Auth Server - Instalador  
echo ========================================
echo.
echo El auth server necesita Node.js (https://nodejs.org)
echo.
echo PASOS EN ANDROID CON TERMUX:
echo 1. Instala Termux desde F-Droid
echo 2. Ejecuta:
echo    pkg install nodejs git -y
echo    git clone https://github.com/ZEKO091/Bridge-Zek-REPO.git
echo    cd Bridge-Zek-REPO/server
echo    npm install
echo    ZEK_BRIDGE_PORT=6061 node server.js
echo.
echo 3. El servidor quedara en http://localhost:6061
echo.
echo Para acceso desde la red local, usa:
echo    ZEK_BRIDGE_PORT=6061 node server.js --host 0.0.0.0
echo.
echo RECOMENDACION: Usa Render.com gratis en vez del celular
echo (mas estable, HTTPS incluido, 24/7 sin bateria)
pause
