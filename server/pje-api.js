/**
 * API de Consulta ao PJe - 1º e 2º Grau
 * 
 * Este módulo fornece endpoints REST para consulta de processos judiciais
 * nos bancos de dados do PJe (1º e 2º grau).
 */

const { Pool } = require('pg');
const config = require('./config');

// Pools de conexão para 1º e 2º grau
const pool1grau = new Pool(config.db1grau);
const pool2grau = new Pool(config.db2grau);

// Tratamento de erros de conexão
pool1grau.on('error', (err) => {
  console.error('Erro no pool de conexão 1º Grau:', err);
});

pool2grau.on('error', (err) => {
  console.error('Erro no pool de conexão 2º Grau:', err);
});

/**
 * Valida e formata o número do processo
 * Formato esperado: NNNNNNN-DD.AAAA.J.TR.OOOO
 */
function parseProcessNumber(numeroProcesso) {
  // Remove espaços e caracteres especiais extras
  const cleaned = numeroProcesso.trim();
  
  // Regex para validar o formato do número único
  const regex = /^(\d{7})-(\d{2})\.(\d{4})\.(\d{1})\.(\d{2})\.(\d{4})$/;
  const match = cleaned.match(regex);
  
  if (!match) {
    return null;
  }
  
  return {
    sequencia: parseInt(match[1]),
    digito: parseInt(match[2]),
    ano: parseInt(match[3]),
    justica: parseInt(match[4]),
    tribunal: parseInt(match[5]),
    origem: match[6],
    grau: parseInt(match[6]) >= 9000 ? 2 : 1 // Se origem >= 9000, é 2º grau
  };
}

/**
 * Determina qual pool usar baseado no número do processo
 */
function getPool(numeroProcesso) {
  const parsed = parseProcessNumber(numeroProcesso);
  if (!parsed) return null;
  
  return parsed.grau === 2 ? pool2grau : pool1grau;
}

/**
 * Busca dados gerais do processo
 */
async function buscarProcesso(numeroProcesso) {
  const parsed = parseProcessNumber(numeroProcesso);
  if (!parsed) {
    throw new Error('Número de processo inválido. Use o formato: NNNNNNN-DD.AAAA.J.TR.OOOO');
  }
  
  const pool = parsed.grau === 2 ? pool2grau : pool1grau;
  
  const query = `
    SELECT 
      pt.id_processo_trf,
      pt.nr_sequencia,
      pt.nr_ano,
      pt.nr_digito_verificador,
      pt.dt_autuacao,
      pt.dt_distribuicao,
      pt.vl_causa,
      pt.in_segredo_justica,
      pt.in_justica_gratuita,
      pt.cd_processo_status,
      cj.ds_classe_judicial,
      cj.ds_classe_judicial_sigla,
      oj.ds_orgao_julgador,
      oj.ds_sigla as sigla_orgao
    FROM pje.tb_processo_trf pt
    JOIN pje.tb_classe_judicial cj ON pt.id_classe_judicial = cj.id_classe_judicial
    JOIN pje.tb_orgao_julgador oj ON pt.id_orgao_julgador = oj.id_orgao_julgador
    WHERE pt.nr_sequencia = $1 
      AND pt.nr_ano = $2 
      AND pt.nr_digito_verificador = $3
  `;
  
  const result = await pool.query(query, [parsed.sequencia, parsed.ano, parsed.digito]);
  
  if (result.rows.length === 0) {
    return null;
  }
  
  const processo = result.rows[0];
  
  return {
    id: processo.id_processo_trf,
    numero: numeroProcesso,
    sequencia: processo.nr_sequencia,
    ano: processo.nr_ano,
    digito: processo.nr_digito_verificador,
    dataAutuacao: processo.dt_autuacao,
    dataDistribuicao: processo.dt_distribuicao,
    valorCausa: parseFloat(processo.vl_causa),
    segredoJustica: processo.in_segredo_justica === 'S',
    justicaGratuita: processo.in_justica_gratuita === 'S',
    status: processo.cd_processo_status,
    classe: {
      nome: processo.ds_classe_judicial,
      sigla: processo.ds_classe_judicial_sigla
    },
    orgaoJulgador: {
      nome: processo.ds_orgao_julgador,
      sigla: processo.sigla_orgao
    },
    grau: parsed.grau
  };
}

/**
 * Busca as partes do processo
 */
async function buscarPartes(numeroProcesso) {
  const parsed = parseProcessNumber(numeroProcesso);
  if (!parsed) {
    throw new Error('Número de processo inválido');
  }
  
  const pool = parsed.grau === 2 ? pool2grau : pool1grau;
  
  // Primeiro, buscar o id_processo_trf
  const queryProcesso = `
    SELECT id_processo_trf 
    FROM pje.tb_processo_trf 
    WHERE nr_sequencia = $1 AND nr_ano = $2 AND nr_digito_verificador = $3
  `;
  
  const resultProcesso = await pool.query(queryProcesso, [parsed.sequencia, parsed.ano, parsed.digito]);
  
  if (resultProcesso.rows.length === 0) {
    return null;
  }
  
  const idProcessoTrf = resultProcesso.rows[0].id_processo_trf;
  
  // Buscar as partes usando a view
  const queryPartes = `
    SELECT 
      vp.ds_nome,
      vp.ds_tipo_parte,
      vp.in_tipo_pessoa,
      vp.nr_cpf,
      vp.nr_cnpj,
      vp.ds_profissao,
      vp.in_participacao,
      tp.in_polo_ativo,
      tp.in_polo_passivo
    FROM pje.vs_processo_parte_webservice vp
    JOIN pje.tb_processo_parte pp ON vp.id_processo_parte = pp.id_processo_parte
    JOIN pje.tb_tipo_parte tp ON pp.id_tipo_parte = tp.id_tipo_parte
    WHERE vp.id_processo_trf = $1
      AND pp.in_participacao = 'A'
    ORDER BY tp.in_polo_ativo DESC, tp.in_polo_passivo DESC, vp.ds_nome
  `;
  
  const result = await pool.query(queryPartes, [idProcessoTrf]);
  
  // Organizar partes por polo
  const partes = {
    poloAtivo: [],
    poloPassivo: [],
    outros: []
  };
  
  result.rows.forEach(row => {
    const parte = {
      nome: row.ds_nome,
      tipoParte: row.ds_tipo_parte,
      tipoPessoa: row.in_tipo_pessoa === 'F' ? 'Física' : 'Jurídica',
      documento: row.in_tipo_pessoa === 'F' ? row.nr_cpf : row.nr_cnpj,
      profissao: row.ds_profissao
    };
    
    if (row.in_polo_ativo === 'S') {
      partes.poloAtivo.push(parte);
    } else if (row.in_polo_passivo === 'S') {
      partes.poloPassivo.push(parte);
    } else {
      partes.outros.push(parte);
    }
  });
  
  return partes;
}

/**
 * Busca o histórico de movimentações do processo (caminho histórico pelos fluxos jBPM)
 */
async function buscarHistorico(numeroProcesso, limite = 100) {
  const parsed = parseProcessNumber(numeroProcesso);
  if (!parsed) {
    throw new Error('Número de processo inválido');
  }
  
  const pool = parsed.grau === 2 ? pool2grau : pool1grau;
  
  // Query para traçar o caminho histórico do processo através dos fluxos jBPM
  // Tabelas jBPM estão no schema pje_jbpm, tabelas do processo estão no schema pje
  const queryHistoricoJbpm = `
    SELECT
      pje.tb_processo.nr_processo AS "numeroProcesso", 
      pje_jbpm.jbpm_processdefinition.name_ AS "fluxo", 
      pje_jbpm.jbpm_task.name_ AS "tarefa", 
      taskinstance.id_ AS "taskInstance", 
      token.id_ AS "token", 
      processinstance.id_ AS "processInstance",      
      taskinstance.create_ AS "dataCriacao", 
      taskinstance.start_ AS "dataAbertura", 
      taskinstance.end_ AS "dataSaida"
    FROM
      pje_jbpm.jbpm_token token, 
      pje_jbpm.jbpm_processinstance processinstance, 
      pje_jbpm.jbpm_taskinstance taskinstance, 
      pje_jbpm.jbpm_task, 
      pje_jbpm.jbpm_processdefinition, 
      pje.tb_processo, 
      pje.tb_processo_instance 
    WHERE
      token.processinstance_ = processinstance.id_ 
      AND processinstance.processdefinition_ = pje_jbpm.jbpm_processdefinition.id_ 
      AND taskinstance.token_ = token.id_ 
      AND pje_jbpm.jbpm_task.id_ = taskinstance.task_ 
      AND pje.tb_processo_instance.id_processo = pje.tb_processo.id_processo 
      AND pje.tb_processo_instance.id_proc_inst = processinstance.id_ 
      AND pje.tb_processo.nr_processo ILIKE $1
    ORDER BY
      taskinstance.id_ ASC
    LIMIT $2
  `;
  
  try {
    const result = await pool.query(queryHistoricoJbpm, [numeroProcesso, limite]);
    
    return result.rows.map(row => ({
      numeroProcesso: row.numeroProcesso,
      fluxo: row.fluxo,
      tarefa: row.tarefa,
      taskInstance: row.taskInstance,
      token: row.token,
      processInstance: row.processInstance,
      dataCriacao: row.dataCriacao,
      dataAbertura: row.dataAbertura,
      dataSaida: row.dataSaida
    }));
  } catch (error) {
    console.error('Erro ao buscar histórico jBPM:', error);
    
    // Fallback: tentar query simplificada usando eg_pje
    try {
      const queryHistoricoSimples = `
        SELECT 
          mp.dta_ocorrencia as data,
          mp.cd_movimento as codigo_movimento,
          dm.ds_movimento as descricao
        FROM eg_pje.tb_movimentos_processuais mp
        LEFT JOIN eg_pje.tb_desc_movimentos_processuais dm ON mp.cd_movimento = dm.cd_movimento
        WHERE mp.id_processo = (
          SELECT pj.id_processo 
          FROM eg_pje.tb_processos_judiciais pj
          WHERE pj.num_proc = $1 AND pj.ano_proc = $2 AND pj.num_dig_proc = $3
          LIMIT 1
        )
        ORDER BY mp.dta_ocorrencia DESC
        LIMIT $4
      `;
      
      const resultSimples = await pool.query(queryHistoricoSimples, [parsed.sequencia, parsed.ano, parsed.digito, limite]);
      
      return resultSimples.rows.map(row => ({
        data: row.data,
        codigoMovimento: row.codigo_movimento,
        descricao: row.descricao || 'Movimentação sem descrição'
      }));
    } catch (errorSimples) {
      console.error('Erro ao buscar histórico simplificado:', errorSimples);
      return [];
    }
  }
}

/**
 * Busca a localização atual do processo
 */
async function buscarLocalizacao(numeroProcesso) {
  const parsed = parseProcessNumber(numeroProcesso);
  if (!parsed) {
    throw new Error('Número de processo inválido');
  }
  
  const pool = parsed.grau === 2 ? pool2grau : pool1grau;
  
  const query = `
    SELECT 
      pt.id_processo_trf,
      oj.ds_orgao_julgador,
      oj.ds_sigla,
      oj.ds_email,
      pt.cd_processo_status,
      pt.dt_distribuicao,
      p.id_caixa
    FROM pje.tb_processo_trf pt
    JOIN pje.tb_orgao_julgador oj ON pt.id_orgao_julgador = oj.id_orgao_julgador
    LEFT JOIN pje.tb_processo p ON p.nr_processo LIKE CONCAT(
      LPAD(pt.nr_sequencia::text, 7, '0'), '-',
      LPAD(pt.nr_digito_verificador::text, 2, '0'), '.',
      pt.nr_ano, '%'
    )
    WHERE pt.nr_sequencia = $1 AND pt.nr_ano = $2 AND pt.nr_digito_verificador = $3
  `;
  
  const result = await pool.query(query, [parsed.sequencia, parsed.ano, parsed.digito]);
  
  if (result.rows.length === 0) {
    return null;
  }
  
  const row = result.rows[0];
  
  // Mapear status do processo
  const statusMap = {
    'A': 'Ativo',
    'B': 'Baixado',
    'S': 'Suspenso',
    'R': 'Remetido',
    'X': 'Excluído'
  };
  
  return {
    orgaoJulgador: {
      nome: row.ds_orgao_julgador,
      sigla: row.ds_sigla,
      email: row.ds_email
    },
    status: statusMap[row.cd_processo_status] || row.cd_processo_status,
    dataDistribuicao: row.dt_distribuicao,
    grau: parsed.grau
  };
}

/**
 * Registra as rotas da API no Express
 */
function registerRoutes(app) {
  // Middleware para tratamento de erros assíncronos
  const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  // Rota de teste de conexão
  app.get('/api/pje/status', asyncHandler(async (req, res) => {
    try {
      const [result1, result2] = await Promise.all([
        pool1grau.query('SELECT current_database() as db, current_user as user'),
        pool2grau.query('SELECT current_database() as db, current_user as user')
      ]);
      
      res.json({
        status: 'ok',
        conexoes: {
          '1grau': {
            conectado: true,
            database: result1.rows[0].db,
            usuario: result1.rows[0].user
          },
          '2grau': {
            conectado: true,
            database: result2.rows[0].db,
            usuario: result2.rows[0].user
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'erro',
        mensagem: error.message
      });
    }
  }));

  // Buscar processo por número
  app.get('/api/processo/:numero', asyncHandler(async (req, res) => {
    const { numero } = req.params;
    
    try {
      const processo = await buscarProcesso(numero);
      
      if (!processo) {
        return res.status(404).json({
          erro: 'Processo não encontrado',
          numero: numero
        });
      }
      
      res.json(processo);
    } catch (error) {
      res.status(400).json({
        erro: error.message
      });
    }
  }));

  // Buscar partes do processo
  app.get('/api/processo/:numero/partes', asyncHandler(async (req, res) => {
    const { numero } = req.params;
    
    try {
      const partes = await buscarPartes(numero);
      
      if (!partes) {
        return res.status(404).json({
          erro: 'Processo não encontrado',
          numero: numero
        });
      }
      
      res.json(partes);
    } catch (error) {
      res.status(400).json({
        erro: error.message
      });
    }
  }));

  // Buscar histórico do processo (caminho histórico pelos fluxos jBPM)
  app.get('/api/processo/:numero/historico', asyncHandler(async (req, res) => {
    const { numero } = req.params;
    const limite = parseInt(req.query.limite) || 100;
    
    try {
      const historico = await buscarHistorico(numero, limite);
      
      res.json({
        numero: numero,
        totalTarefas: historico.length,
        caminhoHistorico: historico
      });
    } catch (error) {
      res.status(400).json({
        erro: error.message
      });
    }
  }));

  // Buscar localização do processo
  app.get('/api/processo/:numero/localizacao', asyncHandler(async (req, res) => {
    const { numero } = req.params;
    
    try {
      const localizacao = await buscarLocalizacao(numero);
      
      if (!localizacao) {
        return res.status(404).json({
          erro: 'Processo não encontrado',
          numero: numero
        });
      }
      
      res.json(localizacao);
    } catch (error) {
      res.status(400).json({
        erro: error.message
      });
    }
  }));

  // Buscar dados completos do processo (processo + partes + localização)
  app.get('/api/processo/:numero/completo', asyncHandler(async (req, res) => {
    const { numero } = req.params;
    
    try {
      const [processo, partes, localizacao] = await Promise.all([
        buscarProcesso(numero),
        buscarPartes(numero),
        buscarLocalizacao(numero)
      ]);
      
      if (!processo) {
        return res.status(404).json({
          erro: 'Processo não encontrado',
          numero: numero
        });
      }
      
      res.json({
        ...processo,
        partes: partes,
        localizacao: localizacao
      });
    } catch (error) {
      res.status(400).json({
        erro: error.message
      });
    }
  }));

  // Middleware de erro
  app.use((error, req, res, next) => {
    console.error('Erro na API:', error);
    res.status(500).json({
      erro: 'Erro interno do servidor',
      detalhes: config.server.nodeEnv === 'development' ? error.message : undefined
    });
  });
}

// Função para fechar conexões (cleanup)
async function closeConnections() {
  await pool1grau.end();
  await pool2grau.end();
  console.log('Conexões com o banco de dados encerradas');
}

module.exports = {
  registerRoutes,
  closeConnections,
  buscarProcesso,
  buscarPartes,
  buscarHistorico,
  buscarLocalizacao,
  parseProcessNumber
};

