#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "========================================"
echo "   Central NAPJe - Iniciando Servidor"
echo "========================================"
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}[ERRO] Node.js não está instalado!${NC}"
    echo ""
    echo "Para instalar:"
    echo "  macOS: brew install node"
    echo "  Linux: sudo apt install nodejs npm"
    echo "  Ou baixe em: https://nodejs.org/"
    echo ""
    exit 1
fi

# Mostrar versão do Node
echo -e "${GREEN}[OK]${NC} Node.js encontrado: $(node -v)"
echo ""

# Ir para a pasta do script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR/server"

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}[INFO]${NC} Instalando dependências pela primeira vez..."
    echo "Isso pode demorar alguns minutos..."
    echo ""
    npm install
    echo ""
fi

# Iniciar o servidor
echo -e "${YELLOW}[INFO]${NC} Iniciando servidor..."
echo ""
echo "========================================"
echo "  Servidor rodando em:"
echo -e "  ${GREEN}http://localhost:3000${NC}"
echo "========================================"
echo ""
echo "Pressione Ctrl+C para parar o servidor"
echo ""

# Abrir navegador automaticamente (após 2 segundos em background)
(sleep 2 && open http://localhost:3000 2>/dev/null || xdg-open http://localhost:3000 2>/dev/null) &

# Executar servidor
node server.js

