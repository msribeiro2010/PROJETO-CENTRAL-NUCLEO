# Central NAPJe - API Backend

Servidor Express.js com integração aos bancos de dados PJe (1º e 2º grau).

## 🚀 Funcionalidades

- Consulta de processos por número único
- Histórico de tramitações
- Partes do processo (polo ativo e passivo)
- Localização atual do processo
- Classe processual e órgão julgador

## 📋 Endpoints da API

### Endpoints Existentes
- `GET /api/aniversariantes` - Lista os aniversariantes do mês
- `GET /api/feriados` - Lista os feriados

### Novos Endpoints PJe
- `GET /api/pje/status` - Status da conexão com os bancos de dados
- `GET /api/processo/:numero` - Dados gerais do processo
- `GET /api/processo/:numero/partes` - Partes do processo
- `GET /api/processo/:numero/historico` - Histórico de movimentações
- `GET /api/processo/:numero/localizacao` - Localização atual
- `GET /api/processo/:numero/completo` - Todos os dados em uma única requisição
- `GET /api/health` - Health check do servidor

### Formato do Número do Processo
O número deve seguir o padrão CNJ: `NNNNNNN-DD.AAAA.J.TR.OOOO`

Exemplo: `0001234-56.2024.5.15.0001`

## ⚙️ Configuração

### Variáveis de Ambiente

Copie o arquivo `config.example.js` para `config.js` e configure as credenciais:

```javascript
// Banco de Dados PJe - 1º Grau
db1grau: {
  host: 'pje-dbpr-a1-replica',
  port: 5432,
  database: 'pje_1grau',
  user: 'seu_usuario',
  password: 'sua_senha',
}
```

### Ou via variáveis de ambiente:

```bash
export DB_1GRAU_HOST=pje-dbpr-a1-replica
export DB_1GRAU_USER=seu_usuario
export DB_1GRAU_PASSWORD=sua_senha
```

## 🛠️ Como Executar

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento (com hot reload)
npm run dev

# Ou executar em modo produção
npm start
```

O servidor estará disponível em `http://localhost:3000`

### Com Docker

```bash
# Na raiz do projeto
docker-compose up -d

# Acessar via:
# - Frontend: http://localhost:8080
# - API: http://localhost:8080/api/
```

## 📦 Estrutura

```
server/
├── server.js         # Servidor principal Express
├── pje-api.js        # Módulo de API PJe (conexão com banco)
├── config.js         # Configurações (não commitar!)
├── config.example.js # Exemplo de configurações
├── package.json      # Dependências
├── data/
│   └── favoritos.json
└── README.md
```

## 🔒 Segurança

- As credenciais do banco NÃO devem ser commitadas no Git
- O arquivo `config.js` está no `.gitignore`
- Em produção, use variáveis de ambiente
- As conexões são feitas via pool com timeout configurável

## 📊 Exemplo de Resposta

```json
{
  "numero": "0001234-56.2024.5.15.0001",
  "grau": 1,
  "classe": {
    "nome": "Ação Trabalhista - Rito Ordinário",
    "sigla": "ATOrd"
  },
  "orgaoJulgador": {
    "nome": "1ª Vara do Trabalho de Campinas",
    "sigla": "1VT CAM"
  },
  "valorCausa": 50000.00,
  "dataAutuacao": "2024-01-15T10:30:00.000Z",
  "partes": {
    "poloAtivo": [...],
    "poloPassivo": [...]
  }
}
```

## 🐛 Troubleshooting

**Erro de conexão com o banco:**
- Verifique se está na rede interna do TRT15 ou conectado via VPN
- Confirme as credenciais no arquivo `config.js`

**Processo não encontrado:**
- Verifique o formato do número do processo
- Confirme se o processo existe no grau correto (1º ou 2º)
