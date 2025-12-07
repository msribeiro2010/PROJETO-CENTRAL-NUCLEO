# ==============================================
# Dockerfile Multi-stage para Central NAPJe
# Inclui Backend Node.js + Frontend Estático
# ==============================================

# Stage 1: Build do Backend
FROM node:18-alpine AS backend-build

WORKDIR /app/server

# Copiar arquivos de dependências
COPY server/package*.json ./

# Instalar dependências de produção
RUN npm ci --only=production

# Copiar código do servidor
COPY server/*.js ./
COPY server/data ./data

# Stage 2: Imagem Final
FROM node:18-alpine

WORKDIR /app

# Instalar supervisor para rodar múltiplos processos
RUN apk add --no-cache supervisor nginx

# Copiar backend do stage anterior
COPY --from=backend-build /app/server ./server

# Copiar arquivos do frontend
COPY *.html ./public/
COPY *.css ./public/
COPY *.js ./public/
COPY *.json ./public/
COPY *.svg ./public/
COPY *.png ./public/

# Remover arquivos desnecessários do frontend
RUN rm -f ./public/package*.json 2>/dev/null || true

# Configurar Nginx para o frontend
RUN mkdir -p /etc/nginx/http.d
COPY nginx.conf /etc/nginx/http.d/default.conf

# Criar arquivo de configuração do supervisor
RUN mkdir -p /etc/supervisor.d
RUN echo '[supervisord]' > /etc/supervisor.d/supervisord.ini && \
    echo 'nodaemon=true' >> /etc/supervisor.d/supervisord.ini && \
    echo 'logfile=/var/log/supervisord.log' >> /etc/supervisor.d/supervisord.ini && \
    echo '' >> /etc/supervisor.d/supervisord.ini && \
    echo '[program:nginx]' >> /etc/supervisor.d/supervisord.ini && \
    echo 'command=nginx -g "daemon off;"' >> /etc/supervisor.d/supervisord.ini && \
    echo 'autostart=true' >> /etc/supervisor.d/supervisord.ini && \
    echo 'autorestart=true' >> /etc/supervisor.d/supervisord.ini && \
    echo '' >> /etc/supervisor.d/supervisord.ini && \
    echo '[program:nodejs]' >> /etc/supervisor.d/supervisord.ini && \
    echo 'command=node /app/server/server.js' >> /etc/supervisor.d/supervisord.ini && \
    echo 'directory=/app/server' >> /etc/supervisor.d/supervisord.ini && \
    echo 'autostart=true' >> /etc/supervisor.d/supervisord.ini && \
    echo 'autorestart=true' >> /etc/supervisor.d/supervisord.ini && \
    echo 'environment=NODE_ENV="production"' >> /etc/supervisor.d/supervisord.ini

# Expor portas
EXPOSE 80 3000

# Iniciar supervisor (gerencia nginx + node)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor.d/supervisord.ini"]