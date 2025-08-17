# Central Núcleo - Deploy Guide

Este guia fornece instruções completas para fazer o deploy da aplicação Central Núcleo.

## 📋 Pré-requisitos

- **Para deploy com Docker:** Docker e Docker Compose instalados
- **Para deploy com Python:** Python 3.x instalado
- **Para deploy com Node.js:** Node.js e npm instalados
- Porta 8080 disponível

## 🚀 Deploy com Docker

### 🚀 Deploy Rápido com Script Automatizado (Recomendado)

O projeto inclui um script de deploy que oferece múltiplas opções:

```bash
# Tornar o script executável (apenas na primeira vez)
chmod +x deploy.sh

# Opções de deploy:
./deploy.sh docker   # Deploy com Docker (produção)
./deploy.sh python   # Deploy com Python (desenvolvimento)
./deploy.sh node     # Deploy com Node.js (desenvolvimento)
./deploy.sh stop     # Parar todos os servidores
```

### Opção 1: Docker Compose (Recomendado)

```bash
# 1. Usando o script (recomendado)
./deploy.sh docker

# 2. Ou manualmente
# Clone ou navegue até o diretório do projeto
cd PROJETO-CENTRAL-NUCLEO

# Construa e inicie o container
docker-compose up -d --build

# Acesse a aplicação em:
http://localhost:8080
```

### 🐍 Deploy com Python (Desenvolvimento)

```bash
# 1. Usando o script (recomendado)
./deploy.sh python

# 2. Ou manualmente
python3 -m http.server 8080

# Acesse a aplicação em:
http://localhost:8080
```

### 📦 Deploy com Node.js (Desenvolvimento)

```bash
# 1. Usando o script (recomendado)
./deploy.sh node

# 2. Ou manualmente
npx serve . -p 8080

# Acesse a aplicação em:
http://localhost:8080
```

### Opção 2: Docker Manual

```bash
# Construa a imagem
docker build -t central-nucleo .

# Execute o container
docker run -d -p 8080:80 --name central-nucleo-app central-nucleo

# Acesse a aplicação em:
http://localhost:8080
```

## 🛠️ Comandos Úteis

### Parar a aplicação
```bash
docker-compose down
```

### Ver logs
```bash
docker-compose logs -f
```

### Reconstruir após mudanças
```bash
docker-compose up -d --build
```

### Remover tudo (containers, imagens, volumes)
```bash
docker-compose down --rmi all --volumes
```

## 🌐 Deploy em Produção

### Variáveis de Ambiente

Para produção, você pode modificar o `docker-compose.yml` para incluir:

```yaml
environment:
  - NGINX_HOST=seu-dominio.com
  - NGINX_PORT=80
```

### HTTPS/SSL

Para HTTPS, adicione um proxy reverso como Traefik ou configure certificados SSL no Nginx.

### Exemplo com Traefik

```yaml
services:
  central-nucleo:
    build: .
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.central-nucleo.rule=Host(`seu-dominio.com`)"
      - "traefik.http.routers.central-nucleo.tls.certresolver=letsencrypt"
```

## 📊 Monitoramento

A aplicação inclui:
- Logs de acesso do Nginx
- Compressão gzip automática
- Cache otimizado para arquivos estáticos
- Headers de segurança

## 🔧 Personalização

- **Nginx**: Edite `nginx.conf` para configurações personalizadas
- **Docker**: Modifique `Dockerfile` para dependências adicionais
- **Compose**: Ajuste `docker-compose.yml` para configurações de rede/volumes

## 📝 Notas

- A aplicação roda na porta 8080 por padrão
- Arquivos de desenvolvimento (.vscode, .claude, server/) são removidos automaticamente
- Cache configurado para 1 ano em arquivos estáticos
- Compressão gzip ativada para melhor performance