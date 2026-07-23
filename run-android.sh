#!/data/data/com.termux/files/usr/bin/bash
echo "=== ZEK BRIDGE Auth Server para Android ==="
echo "Instalando Node.js..."
pkg update && pkg upgrade -y
pkg install nodejs -y
echo "Clonando repositorio..."
cd ~
git clone https://github.com/ZEKO091/Bridge-Zek-REPO.git
cd Bridge-Zek-REPO/server
echo "Instalando dependencias..."
npm install
echo "Iniciando servidor auth en puerto 6061..."
export ZEK_BRIDGE_DATA_DIR=~/zek-bridge-data
export ZEK_BRIDGE_PORT=6061
mkdir -p $ZEK_BRIDGE_DATA_DIR
node server.js
