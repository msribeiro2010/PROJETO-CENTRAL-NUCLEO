#!/bin/bash

# Script de Deploy - Central Núcleo
# Este script oferece múltiplas opções de deploy

echo "🚀 Central Núcleo - Deploy Script"
echo "==================================="

# Função para verificar se o Docker está rodando
check_docker() {
    if docker info >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Função para deploy com Docker
deploy_docker() {
    echo "📦 Iniciando deploy com Docker..."
    
    if check_docker; then
        echo "✅ Docker está rodando"
        
        # Para containers existentes
        echo "🛑 Parando containers existentes..."
        docker-compose down 2>/dev/null || true
        
        # Build e start
        echo "🔨 Construindo e iniciando aplicação..."
        docker-compose up -d --build
        
        if [ $? -eq 0 ]; then
            echo "✅ Deploy realizado com sucesso!"
            echo "🌐 Aplicação disponível em: http://localhost:8080"
            echo "📊 Para ver logs: docker-compose logs -f"
            echo "🛑 Para parar: docker-compose down"
        else
            echo "❌ Erro no deploy com Docker"
            return 1
        fi
    else
        echo "❌ Docker não está rodando. Inicie o Docker Desktop e tente novamente."
        return 1
    fi
}

# Função para deploy com servidor Python
deploy_python() {
    echo "🐍 Iniciando deploy com Python..."
    
    # Verificar se Python está disponível
    if command -v python3 >/dev/null 2>&1; then
        echo "✅ Python3 encontrado"
        
        # Parar servidores existentes na porta 8080
        echo "🛑 Verificando porta 8080..."
        lsof -ti:8080 | xargs kill -9 2>/dev/null || true
        
        # Iniciar servidor
        echo "🚀 Iniciando servidor Python na porta 8080..."
        python3 -m http.server 8080 &
        SERVER_PID=$!
        
        sleep 2
        
        if ps -p $SERVER_PID > /dev/null; then
            echo "✅ Servidor iniciado com sucesso!"
            echo "🌐 Aplicação disponível em: http://localhost:8080"
            echo "📝 PID do servidor: $SERVER_PID"
            echo "🛑 Para parar: kill $SERVER_PID"
            
            # Salvar PID para facilitar parada posterior
            echo $SERVER_PID > .server_pid
        else
            echo "❌ Erro ao iniciar servidor Python"
            return 1
        fi
    else
        echo "❌ Python3 não encontrado"
        return 1
    fi
}

# Função para deploy com Node.js (serve)
deploy_node() {
    echo "📦 Iniciando deploy com Node.js (serve)..."
    
    if command -v npx >/dev/null 2>&1; then
        echo "✅ Node.js/npx encontrado"
        
        # Parar servidores existentes na porta 8080
        echo "🛑 Verificando porta 8080..."
        lsof -ti:8080 | xargs kill -9 2>/dev/null || true
        
        # Iniciar servidor
        echo "🚀 Iniciando servidor com 'serve' na porta 8080..."
        npx serve . -p 8080 &
        SERVER_PID=$!
        
        sleep 3
        
        if ps -p $SERVER_PID > /dev/null; then
            echo "✅ Servidor iniciado com sucesso!"
            echo "🌐 Aplicação disponível em: http://localhost:8080"
            echo "📝 PID do servidor: $SERVER_PID"
            echo "🛑 Para parar: kill $SERVER_PID"
            
            # Salvar PID
            echo $SERVER_PID > .server_pid
        else
            echo "❌ Erro ao iniciar servidor Node.js"
            return 1
        fi
    else
        echo "❌ Node.js/npx não encontrado"
        return 1
    fi
}

# Função para parar servidores
stop_servers() {
    echo "🛑 Parando servidores..."
    
    # Parar Docker
    docker-compose down 2>/dev/null || true
    
    # Parar servidores na porta 8080
    lsof -ti:8080 | xargs kill -9 2>/dev/null || true
    
    # Parar usando PID salvo
    if [ -f .server_pid ]; then
        kill $(cat .server_pid) 2>/dev/null || true
        rm .server_pid
    fi
    
    echo "✅ Servidores parados"
}

# Menu principal
case "$1" in
    "docker")
        deploy_docker
        ;;
    "python")
        deploy_python
        ;;
    "node")
        deploy_node
        ;;
    "stop")
        stop_servers
        ;;
    *)
        echo "Uso: $0 {docker|python|node|stop}"
        echo ""
        echo "Opções:"
        echo "  docker  - Deploy com Docker (recomendado para produção)"
        echo "  python  - Deploy com servidor Python (desenvolvimento)"
        echo "  node    - Deploy com serve do Node.js (desenvolvimento)"
        echo "  stop    - Parar todos os servidores"
        echo ""
        echo "Exemplo: $0 docker"
        exit 1
        ;;
esac