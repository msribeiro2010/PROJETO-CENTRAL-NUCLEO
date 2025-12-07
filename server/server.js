const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

// Importa a API do PJe
const pjeApi = require('./pje-api');
const config = require('./config');

const app = express();
const PORT = config.server.port;

// Middleware
app.use(cors({
  origin: '*', // Em produção, especifique os domínios permitidos
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Servir arquivos estáticos do diretório pai (frontend)
app.use(express.static(path.join(__dirname, '..')));

// Helper function to read JSON files
async function readJsonFile(filename) {
  try {
    const filePath = path.join(__dirname, 'data', filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    throw error;
  }
}

// ==========================================
// Endpoints existentes
// ==========================================

app.get('/api/aniversariantes', async (req, res) => {
  try {
    const data = await readJsonFile('aniversariantes.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching birthday data' });
  }
});

app.get('/api/feriados', async (req, res) => {
  try {
    const data = await readJsonFile('feriados.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching holiday data' });
  }
});

// ==========================================
// Registrar rotas da API PJe
// ==========================================
pjeApi.registerRoutes(app);

// ==========================================
// Rota de health check
// ==========================================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║     Central NAPJe - Servidor com API PJe                   ║
╠════════════════════════════════════════════════════════════╣
║  🚀 Servidor rodando na porta: ${PORT}                         ║
║  📁 Frontend: http://localhost:${PORT}                         ║
║  🔌 API PJe: http://localhost:${PORT}/api/pje/status            ║
║  📊 Health: http://localhost:${PORT}/api/health                 ║
╚════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Recebido SIGTERM, encerrando servidor...');
  await pjeApi.closeConnections();
  server.close(() => {
    console.log('Servidor encerrado');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('Recebido SIGINT, encerrando servidor...');
  await pjeApi.closeConnections();
  server.close(() => {
    console.log('Servidor encerrado');
    process.exit(0);
  });
}); 