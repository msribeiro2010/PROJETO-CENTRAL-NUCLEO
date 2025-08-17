# Use uma imagem base do Nginx para servir arquivos estáticos
FROM nginx:alpine

# Copie todos os arquivos do projeto para o diretório padrão do Nginx
COPY . /usr/share/nginx/html/

# Remova arquivos desnecessários para produção
RUN rm -rf /usr/share/nginx/html/.claude \
    && rm -rf /usr/share/nginx/html/.vscode \
    && rm -rf /usr/share/nginx/html/server \
    && rm -f /usr/share/nginx/html/.hintrc \
    && rm -f /usr/share/nginx/html/Dockerfile \
    && rm -f /usr/share/nginx/html/docker-compose.yml

# Exponha a porta 80
EXPOSE 80

# O Nginx será iniciado automaticamente
CMD ["nginx", "-g", "daemon off;"]