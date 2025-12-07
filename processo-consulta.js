/**
 * Módulo de Consulta de Processos PJe
 * 
 * Este módulo gerencia a interface de consulta de processos,
 * fazendo requisições à API backend e exibindo os resultados.
 */

// Configuração da API
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? `http://localhost:3000`
  : ''; // Em produção, usa o mesmo servidor

// Estado do modal
let currentTab = 'dados';
let processoAtual = null;

/**
 * Inicializa o módulo de consulta de processos
 */
function initProcessoConsulta() {
  // Criar o modal no DOM
  createProcessoModal();
  
  // Configurar eventos
  setupEventListeners();
  
  console.log('Módulo de consulta de processos inicializado');
}

/**
 * Cria a estrutura HTML do modal
 */
function createProcessoModal() {
  const modalHTML = `
    <div id="processo-modal" class="processo-modal">
      <div class="processo-modal-content">
        <div class="processo-modal-header">
          <h2><i class="bi bi-search"></i> Consulta de Processo PJe</h2>
          <button class="processo-modal-close" onclick="closeProcessoModal()">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="processo-modal-body">
          <!-- Search Box -->
          <div class="processo-search-container">
            <div class="processo-search-box">
              <input 
                type="text" 
                id="processo-search-input" 
                class="processo-search-input"
                placeholder="Digite o número do processo (ex: 0001234-56.2024.5.15.0001)"
                maxlength="25"
              />
              <button id="processo-search-btn" class="processo-search-btn" onclick="buscarProcesso()">
                <i class="bi bi-search"></i>
                Buscar
              </button>
            </div>
          </div>
          
          <!-- Results Container -->
          <div id="processo-results" class="processo-results">
            <div class="processo-no-results">
              <i class="bi bi-folder-x"></i>
              <p>Digite o número do processo para consultar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

/**
 * Configura os event listeners
 */
function setupEventListeners() {
  // Input de busca - Enter para buscar
  const searchInput = document.getElementById('processo-search-input');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        buscarProcesso();
      }
    });
    
    // Formatação automática do número do processo
    searchInput.addEventListener('input', formatarNumeroProcesso);
  }
  
  // Fechar modal ao clicar fora
  const modal = document.getElementById('processo-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProcessoModal();
      }
    });
  }
  
  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
      closeProcessoModal();
    }
  });
}

/**
 * Formata o número do processo enquanto digita
 */
function formatarNumeroProcesso(e) {
  let value = e.target.value.replace(/\D/g, '');
  
  if (value.length > 20) {
    value = value.substring(0, 20);
  }
  
  // Formatar: NNNNNNN-DD.AAAA.J.TR.OOOO
  let formatted = '';
  
  if (value.length > 0) {
    formatted = value.substring(0, 7);
  }
  if (value.length > 7) {
    formatted += '-' + value.substring(7, 9);
  }
  if (value.length > 9) {
    formatted += '.' + value.substring(9, 13);
  }
  if (value.length > 13) {
    formatted += '.' + value.substring(13, 14);
  }
  if (value.length > 14) {
    formatted += '.' + value.substring(14, 16);
  }
  if (value.length > 16) {
    formatted += '.' + value.substring(16, 20);
  }
  
  e.target.value = formatted;
}

/**
 * Abre o modal de consulta
 */
function openProcessoModal() {
  const modal = document.getElementById('processo-modal');
  if (modal) {
    modal.classList.add('show');
    document.getElementById('processo-search-input').focus();
  }
}

/**
 * Fecha o modal de consulta
 */
function closeProcessoModal() {
  const modal = document.getElementById('processo-modal');
  if (modal) {
    modal.classList.remove('show');
  }
}

/**
 * Busca os dados do processo
 */
async function buscarProcesso() {
  const input = document.getElementById('processo-search-input');
  const numero = input.value.trim();
  
  if (!numero) {
    showToast('Digite o número do processo');
    return;
  }
  
  // Validar formato
  const regex = /^\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}$/;
  if (!regex.test(numero)) {
    showToast('Formato inválido. Use: NNNNNNN-DD.AAAA.J.TR.OOOO');
    return;
  }
  
  const resultsContainer = document.getElementById('processo-results');
  
  // Mostrar loading
  resultsContainer.innerHTML = `
    <div class="processo-loading">
      <i class="bi bi-arrow-repeat"></i>
      <p>Buscando processo...</p>
    </div>
  `;
  
  try {
    // Buscar dados completos do processo
    const response = await fetch(`${API_BASE_URL}/api/processo/${numero}/completo`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Processo não encontrado');
      }
      throw new Error('Erro ao buscar processo');
    }
    
    const data = await response.json();
    processoAtual = data;
    
    // Buscar histórico (caminho histórico pelos fluxos jBPM)
    const historicoResponse = await fetch(`${API_BASE_URL}/api/processo/${numero}/historico?limite=100`);
    const historicoData = await historicoResponse.json();
    
    // Renderizar resultados
    renderProcessoResults(data, historicoData.caminhoHistorico || historicoData.movimentacoes || []);
    
  } catch (error) {
    console.error('Erro ao buscar processo:', error);
    resultsContainer.innerHTML = `
      <div class="processo-error">
        <i class="bi bi-exclamation-triangle"></i>
        <p>${error.message}</p>
        <p style="font-size: 0.85rem; margin-top: 8px; color: #94a3b8;">
          Verifique se o servidor está rodando e se o número do processo está correto.
        </p>
      </div>
    `;
  }
}

/**
 * Renderiza os resultados do processo
 */
function renderProcessoResults(processo, historico) {
  const container = document.getElementById('processo-results');
  
  // Formatar valores
  const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(processo.valorCausa || 0);
  
  const dataAutuacao = processo.dataAutuacao 
    ? new Date(processo.dataAutuacao).toLocaleDateString('pt-BR')
    : 'Não informada';
  
  const dataDistribuicao = processo.dataDistribuicao
    ? new Date(processo.dataDistribuicao).toLocaleDateString('pt-BR')
    : 'Não informada';
  
  // Status badge
  const statusClass = processo.localizacao?.status?.toLowerCase() || 'ativo';
  const grauClass = processo.grau === 1 ? 'grau-1' : 'grau-2';
  
  // Partes
  const partesPoloAtivo = processo.partes?.poloAtivo || [];
  const partesPoloPassivo = processo.partes?.poloPassivo || [];
  
  container.innerHTML = `
    <!-- Tabs -->
    <div class="processo-tabs">
      <button class="processo-tab active" data-tab="dados" onclick="switchTab('dados')">
        <i class="bi bi-file-text"></i> Dados
      </button>
      <button class="processo-tab" data-tab="partes" onclick="switchTab('partes')">
        <i class="bi bi-people"></i> Partes (${partesPoloAtivo.length + partesPoloPassivo.length})
      </button>
      <button class="processo-tab" data-tab="historico" onclick="switchTab('historico')">
        <i class="bi bi-clock-history"></i> Histórico (${historico.length})
      </button>
    </div>
    
    <!-- Tab: Dados do Processo -->
    <div id="tab-dados" class="processo-tab-content active">
      <!-- Informações Gerais -->
      <div class="processo-info-card">
        <div class="processo-info-header">
          <i class="bi bi-file-earmark-text"></i>
          <h3>Informações do Processo</h3>
        </div>
        <div class="processo-info-content">
          <div class="processo-data-grid">
            <div class="processo-data-item">
              <span class="processo-data-label">Número do Processo</span>
              <span class="processo-data-value numero">${processo.numero}</span>
            </div>
            <div class="processo-data-item">
              <span class="processo-data-label">Grau</span>
              <span class="processo-badge ${grauClass}">${processo.grau}º Grau</span>
            </div>
            <div class="processo-data-item">
              <span class="processo-data-label">Status</span>
              <span class="processo-badge ${statusClass}">${processo.localizacao?.status || 'Ativo'}</span>
            </div>
            <div class="processo-data-item">
              <span class="processo-data-label">Classe Judicial</span>
              <span class="processo-data-value">${processo.classe?.nome || 'Não informada'}</span>
            </div>
            <div class="processo-data-item">
              <span class="processo-data-label">Órgão Julgador</span>
              <span class="processo-data-value">${processo.orgaoJulgador?.nome || 'Não informado'}</span>
            </div>
            <div class="processo-data-item">
              <span class="processo-data-label">Valor da Causa</span>
              <span class="processo-data-value valor">${valorFormatado}</span>
            </div>
            <div class="processo-data-item">
              <span class="processo-data-label">Data de Autuação</span>
              <span class="processo-data-value">${dataAutuacao}</span>
            </div>
            <div class="processo-data-item">
              <span class="processo-data-label">Data de Distribuição</span>
              <span class="processo-data-value">${dataDistribuicao}</span>
            </div>
            <div class="processo-data-item">
              <span class="processo-data-label">Justiça Gratuita</span>
              <span class="processo-data-value">${processo.justicaGratuita ? 'Sim' : 'Não'}</span>
            </div>
            <div class="processo-data-item">
              <span class="processo-data-label">Segredo de Justiça</span>
              <span class="processo-data-value">${processo.segredoJustica ? 'Sim' : 'Não'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Tab: Partes -->
    <div id="tab-partes" class="processo-tab-content">
      <div class="processo-info-card">
        <div class="processo-info-header">
          <i class="bi bi-people"></i>
          <h3>Partes do Processo</h3>
        </div>
        <div class="processo-info-content">
          <div class="processo-partes-list">
            <!-- Polo Ativo -->
            <div class="processo-polo">
              <div class="processo-polo-title ativo">
                <i class="bi bi-person-check"></i> Polo Ativo (Reclamante)
              </div>
              ${partesPoloAtivo.length > 0 ? partesPoloAtivo.map(parte => `
                <div class="processo-parte-item">
                  <div class="processo-parte-nome">${parte.nome || 'Nome não informado'}</div>
                  <div class="processo-parte-info">
                    <span><i class="bi bi-tag"></i> ${parte.tipoParte || 'Parte'}</span>
                    <span><i class="bi bi-person"></i> ${parte.tipoPessoa}</span>
                    ${parte.documento ? `<span><i class="bi bi-card-text"></i> ${maskDocument(parte.documento)}</span>` : ''}
                    ${parte.profissao ? `<span><i class="bi bi-briefcase"></i> ${parte.profissao}</span>` : ''}
                  </div>
                </div>
              `).join('') : '<div class="processo-parte-item">Nenhuma parte no polo ativo</div>'}
            </div>
            
            <!-- Polo Passivo -->
            <div class="processo-polo">
              <div class="processo-polo-title passivo">
                <i class="bi bi-person-x"></i> Polo Passivo (Reclamado)
              </div>
              ${partesPoloPassivo.length > 0 ? partesPoloPassivo.map(parte => `
                <div class="processo-parte-item">
                  <div class="processo-parte-nome">${parte.nome || 'Nome não informado'}</div>
                  <div class="processo-parte-info">
                    <span><i class="bi bi-tag"></i> ${parte.tipoParte || 'Parte'}</span>
                    <span><i class="bi bi-person"></i> ${parte.tipoPessoa}</span>
                    ${parte.documento ? `<span><i class="bi bi-card-text"></i> ${maskDocument(parte.documento)}</span>` : ''}
                    ${parte.profissao ? `<span><i class="bi bi-briefcase"></i> ${parte.profissao}</span>` : ''}
                  </div>
                </div>
              `).join('') : '<div class="processo-parte-item">Nenhuma parte no polo passivo</div>'}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Tab: Histórico -->
    <div id="tab-historico" class="processo-tab-content">
      <div class="processo-info-card">
        <div class="processo-info-header">
          <i class="bi bi-clock-history"></i>
          <h3>Caminho Histórico do Processo</h3>
        </div>
        <div class="processo-info-content">
          ${historico.length > 0 ? `
            <div class="processo-historico-list">
              ${renderHistorico(historico)}
            </div>
          ` : `
            <div class="processo-no-results">
              <i class="bi bi-clock"></i>
              <p>Nenhuma movimentação encontrada</p>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
  
  currentTab = 'dados';
}

/**
 * Renderiza o histórico do processo (suporta formato jBPM e simplificado)
 */
function renderHistorico(historico) {
  // Verificar se é formato jBPM (tem campo 'fluxo' e 'tarefa')
  const isJbpmFormat = historico.length > 0 && historico[0].fluxo !== undefined;
  
  if (isJbpmFormat) {
    // Agrupar por fluxo
    const fluxosMap = new Map();
    historico.forEach(item => {
      if (!fluxosMap.has(item.fluxo)) {
        fluxosMap.set(item.fluxo, []);
      }
      fluxosMap.get(item.fluxo).push(item);
    });
    
    let html = '';
    let fluxoIndex = 0;
    
    fluxosMap.forEach((tarefas, fluxo) => {
      fluxoIndex++;
      html += `
        <div class="processo-fluxo-group">
          <div class="processo-fluxo-header">
            <i class="bi bi-diagram-3"></i>
            <span class="processo-fluxo-nome">${fluxo}</span>
            <span class="processo-fluxo-count">(${tarefas.length} tarefas)</span>
          </div>
          <div class="processo-tarefas-list">
            ${tarefas.map((tarefa, idx) => `
              <div class="processo-tarefa-item ${tarefa.dataSaida ? 'concluida' : 'ativa'}">
                <div class="processo-tarefa-marker">
                  <span class="processo-tarefa-numero">${idx + 1}</span>
                </div>
                <div class="processo-tarefa-content">
                  <div class="processo-tarefa-nome">
                    <i class="bi bi-check-circle${tarefa.dataSaida ? '-fill' : ''}"></i>
                    ${tarefa.tarefa}
                  </div>
                  <div class="processo-tarefa-datas">
                    <span title="Data de Criação">
                      <i class="bi bi-plus-circle"></i>
                      ${tarefa.dataCriacao ? new Date(tarefa.dataCriacao).toLocaleString('pt-BR') : '-'}
                    </span>
                    ${tarefa.dataAbertura ? `
                      <span title="Data de Abertura">
                        <i class="bi bi-box-arrow-in-right"></i>
                        ${new Date(tarefa.dataAbertura).toLocaleString('pt-BR')}
                      </span>
                    ` : ''}
                    ${tarefa.dataSaida ? `
                      <span title="Data de Saída">
                        <i class="bi bi-box-arrow-right"></i>
                        ${new Date(tarefa.dataSaida).toLocaleString('pt-BR')}
                      </span>
                    ` : `
                      <span class="processo-tarefa-atual" title="Tarefa Atual">
                        <i class="bi bi-geo-alt-fill"></i>
                        Localização Atual
                      </span>
                    `}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });
    
    return html;
  } else {
    // Formato simplificado (movimentações)
    return historico.map((mov, index) => `
      <div class="processo-historico-item">
        <div class="processo-historico-data">
          <i class="bi bi-calendar3"></i>
          ${mov.data ? new Date(mov.data).toLocaleString('pt-BR') : 'Data não informada'}
        </div>
        <div class="processo-historico-descricao">
          ${mov.descricao || mov.tarefa || 'Movimentação sem descrição'}
        </div>
      </div>
    `).join('');
  }
}

/**
 * Alterna entre as abas
 */
function switchTab(tabName) {
  // Atualizar abas
  document.querySelectorAll('.processo-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });
  
  // Atualizar conteúdo
  document.querySelectorAll('.processo-tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tabName}`);
  });
  
  currentTab = tabName;
}

/**
 * Mascara documentos (CPF/CNPJ) para privacidade
 */
function maskDocument(doc) {
  if (!doc) return '';
  
  // Se for CPF (11 dígitos)
  if (doc.replace(/\D/g, '').length === 11) {
    return doc.replace(/(\d{3})\d{3}\d{3}(\d{2})/, '$1.***.***-$2');
  }
  
  // Se for CNPJ (14 dígitos)
  if (doc.replace(/\D/g, '').length === 14) {
    return doc.replace(/(\d{2})\d{3}\d{3}(\d{4})(\d{2})/, '$1.***.***/$2-$3');
  }
  
  return doc;
}

/**
 * Verifica o status da API
 */
async function checkApiStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pje/status`);
    const data = await response.json();
    
    if (data.status === 'ok') {
      console.log('API PJe conectada:', data.conexoes);
      return true;
    }
    return false;
  } catch (error) {
    console.warn('API PJe não disponível:', error.message);
    return false;
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  initProcessoConsulta();
  
  // Verificar status da API em segundo plano
  checkApiStatus().then(connected => {
    if (!connected) {
      console.warn('Aviso: API PJe não está disponível. A consulta de processos pode não funcionar.');
    }
  });
});

// Exportar funções globais
window.openProcessoModal = openProcessoModal;
window.closeProcessoModal = closeProcessoModal;
window.buscarProcesso = buscarProcesso;
window.switchTab = switchTab;

