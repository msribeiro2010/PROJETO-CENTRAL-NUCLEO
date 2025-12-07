# 🚀 Como Executar o Central NAPJe Localmente

## Pré-requisitos

1. **Node.js** instalado (versão 16 ou superior)
   - Download: https://nodejs.org/
   
2. **Estar conectado à rede do TRT15** (VPN ou rede interna)
   - Necessário para acessar os bancos de dados do PJe

---

## 🖥️ Windows

### Opção 1: Clique Duplo (Mais Fácil)
1. Dê **duplo clique** no arquivo `iniciar.bat`
2. O navegador abrirá automaticamente em `http://localhost:3000`

### Opção 2: Via Terminal
```cmd
cd server
npm install
npm start
```

---

## 🍎 macOS / Linux

### Opção 1: Terminal (Recomendado)
```bash
./iniciar.sh
```

Se der erro de permissão:
```bash
chmod +x iniciar.sh
./iniciar.sh
```

### Opção 2: Comandos Manuais
```bash
cd server
npm install
npm start
```

---

## 📱 Acessando a Aplicação

Após iniciar, acesse no navegador:

```
http://localhost:3000
```

---

## 🔍 Funcionalidades Disponíveis

| Funcionalidade | Descrição |
|---------------|-----------|
| ✅ Atalhos | Links rápidos para sistemas |
| ✅ Favoritos | Seus atalhos favoritos |
| ✅ Aniversariantes | Lista do mês |
| ✅ Feriados | Calendário 2025 |
| ✅ Tema Claro/Escuro | Personalização visual |
| ✅ **Consulta PJe** | Busca processos nos bancos |

---

## 🔧 Solução de Problemas

### "Erro de conexão com o banco"
- Verifique se está conectado à VPN do TRT15
- Confirme que está na rede interna

### "Node.js não encontrado"
- Instale o Node.js: https://nodejs.org/

### "Porta 3000 já está em uso"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <numero> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

---

## ⏹️ Parando o Servidor

Pressione `Ctrl + C` no terminal onde o servidor está rodando.

---

## 📞 Suporte

Em caso de dúvidas, entre em contato:
- **Email**: msribeiro@trt15.jus.br

