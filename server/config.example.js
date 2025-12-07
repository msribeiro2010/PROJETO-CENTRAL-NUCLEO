/**
 * Configurações de exemplo para conexão com os bancos de dados PJe
 * 
 * INSTRUÇÕES:
 * 1. Copie este arquivo para 'config.js'
 * 2. Preencha as credenciais corretas
 * 3. O arquivo config.js está no .gitignore e não será commitado
 */

module.exports = {
  // Banco de Dados PJe - 1º Grau
  db1grau: {
    host: 'pje-dbpr-a1-replica',
    port: 5432,
    database: 'pje_1grau',
    user: 'seu_usuario',
    password: 'sua_senha',
  },
  
  // Banco de Dados PJe - 2º Grau
  db2grau: {
    host: 'pje-dbpr-a2-replica',
    port: 5432,
    database: 'pje_2grau',
    user: 'seu_usuario',
    password: 'sua_senha',
  },
  
  // Configurações do Servidor
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
  }
};

