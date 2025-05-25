// Script para personalização de cores dos cards

// Função para aplicar cores aos cards
function initializeCardCustomizer() {
    console.log('Inicializando sistema de personalização de cards');
    
    // Remover estilos inline que possam estar interferindo
    document.querySelectorAll('.group').forEach(group => {
        // Limpar estilos inline
        group.style.removeProperty('background');
        group.style.removeProperty('background-image');
        group.style.removeProperty('background-color');
        
        // Remover classes de cores anteriores
        group.className = group.className.replace(/card-\w+/g, '').trim();
        if (!group.classList.contains('group')) {
            group.classList.add('group');
        }
        
        // Só adiciona card-white se não houver cor salva
        const savedColor = localStorage.getItem(`card-color-${group.id}`);
        if (!savedColor) {
            group.classList.add('card-white');
        }
    });
}

// Executar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que todos os estilos foram carregados
    setTimeout(function() {
        initializeCardCustomizer();
        loadSavedColors();
    }, 100);
    
    // Adicionar botão de personalização a cada grupo
    const groups = document.querySelectorAll('.group');
    
    // Definição de cores disponíveis
    const colors = [
        { 
            id: 'white', 
            name: 'Branco', 
            background: 'white',
            border: '#e2e8f0',
            headerBg: 'transparent',
            headerBorder: '#3b82f6',
            textColor: '#1e293b',
            iconColor: '#3b82f6',
            buttonBg: '#f1f5f9',
            buttonBorder: '#3b82f6'
        },
        { 
            id: 'blue', 
            name: 'Azul', 
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            border: '#2563eb',
            headerBg: 'rgba(255, 255, 255, 0.1)',
            headerBorder: 'rgba(255, 255, 255, 0.3)',
            textColor: 'white',
            iconColor: 'white',
            buttonBg: 'rgba(255, 255, 255, 0.1)',
            buttonBorder: 'rgba(255, 255, 255, 0.3)'
        },
        { 
            id: 'green', 
            name: 'Verde', 
            background: 'linear-gradient(135deg, #10b981, #059669)',
            border: '#059669',
            headerBg: 'rgba(255, 255, 255, 0.1)',
            headerBorder: 'rgba(255, 255, 255, 0.3)',
            textColor: 'white',
            iconColor: 'white',
            buttonBg: 'rgba(255, 255, 255, 0.1)',
            buttonBorder: 'rgba(255, 255, 255, 0.3)'
        },
        { 
            id: 'red', 
            name: 'Vermelho', 
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            border: '#dc2626',
            headerBg: 'rgba(255, 255, 255, 0.1)',
            headerBorder: 'rgba(255, 255, 255, 0.3)',
            textColor: 'white',
            iconColor: 'white',
            buttonBg: 'rgba(255, 255, 255, 0.1)',
            buttonBorder: 'rgba(255, 255, 255, 0.3)'
        },
        { 
            id: 'purple', 
            name: 'Roxo', 
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            border: '#7c3aed',
            headerBg: 'rgba(255, 255, 255, 0.1)',
            headerBorder: 'rgba(255, 255, 255, 0.3)',
            textColor: 'white',
            iconColor: 'white',
            buttonBg: 'rgba(255, 255, 255, 0.1)',
            buttonBorder: 'rgba(255, 255, 255, 0.3)'
        },
        { 
            id: 'orange', 
            name: 'Laranja', 
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            border: '#ea580c',
            headerBg: 'rgba(255, 255, 255, 0.1)',
            headerBorder: 'rgba(255, 255, 255, 0.3)',
            textColor: 'white',
            iconColor: 'white',
            buttonBg: 'rgba(255, 255, 255, 0.1)',
            buttonBorder: 'rgba(255, 255, 255, 0.3)'
        }
    ];
    
    groups.forEach(group => {
        // Verificar se já existe um ID para o grupo, caso contrário criar um
        if (!group.id) {
            group.id = 'group-' + Math.random().toString(36).substring(2, 9);
        }
        
        // Criar botão de personalização
        const customizeBtn = document.createElement('div');
        customizeBtn.className = 'color-customize-btn';
        customizeBtn.title = 'Personalizar cor do card';
        customizeBtn.innerHTML = '<i class="bi bi-palette"></i>';
        
        // Criar painel de cores
        const colorPanel = document.createElement('div');
        colorPanel.className = 'color-panel';
        
        // Adicionar opções de cores ao painel
        colors.forEach(color => {
            const colorOption = document.createElement('div');
            colorOption.className = 'color-option';
            colorOption.style.background = color.background;
            colorOption.style.border = `1px solid ${color.border}`;
            colorOption.title = color.name;
            
            // Aplicar cor ao clicar na opção
            colorOption.addEventListener('click', function(event) {
                applyColorToGroup(group, color);
                
                // Salvar preferência no localStorage
                localStorage.setItem(`card-color-${group.id}`, color.id);
                
                // Fechar painel
                colorPanel.style.display = 'none';
                
                // Evitar propagação do evento
                event.stopPropagation();
            });
            
            colorPanel.appendChild(colorOption);
        });
        
        // Abrir/fechar painel ao clicar no botão
        customizeBtn.addEventListener('click', function(event) {
            if (colorPanel.style.display === 'flex') {
                colorPanel.style.display = 'none';
            } else {
                // Fechar outros painéis abertos
                document.querySelectorAll('.color-panel').forEach(panel => {
                    panel.style.display = 'none';
                });
                colorPanel.style.display = 'flex';
            }
            
            event.stopPropagation();
        });
        
        // Fechar painel ao clicar fora
        document.addEventListener('click', function() {
            colorPanel.style.display = 'none';
        });
        
        // Evitar que cliques no painel fechem o painel
        colorPanel.addEventListener('click', function(event) {
            event.stopPropagation();
        });
        
        // Adicionar elementos ao DOM
        group.appendChild(customizeBtn);
        group.appendChild(colorPanel);
        
        // Verificar se há uma preferência salva para este grupo
        const savedColorId = localStorage.getItem(`card-color-${group.id}`);
        if (savedColorId) {
            const savedColor = colors.find(c => c.id === savedColorId);
            if (savedColor) {
                applyColorToGroup(group, savedColor);
            }
        }
    });
    
    // Função para aplicar cor a um grupo
    function applyColorToGroup(group, color) {
        console.log('Aplicando cor', color.id, 'ao grupo', group.id || 'sem id');
        
        // Limpar classes anteriores
        group.className = group.className.replace(/card-\w+/g, '').trim();
        if (!group.classList.contains('group')) {
            group.classList.add('group');
        }
        
        // Adicionar classe de cor
        group.classList.add(`card-${color.id}`);
        
        // Remover estilos inline que possam estar interferindo
        group.style.removeProperty('background');
        group.style.removeProperty('background-image');
        group.style.removeProperty('background-color');
        
        // Aplicar apenas a classe CSS para estilização
        // Isso permite que o CSS se encarregue de aplicar os estilos corretamente
        
        // Salvar a preferência de cor no localStorage
        if (group.id) {
            localStorage.setItem(`card-color-${group.id}`, color.id);
        }
    }
    
    // Função para carregar cores salvas do localStorage
    function loadSavedColors() {
        console.log('Carregando cores salvas do localStorage');
        const groups = document.querySelectorAll('.group');
        
        groups.forEach(group => {
            if (group.id) {
                const savedColor = localStorage.getItem(`card-color-${group.id}`);
                if (savedColor) {
                    console.log(`Cor salva encontrada para ${group.id}: ${savedColor}`);
                    const colorObj = colors.find(c => c.id === savedColor);
                    if (colorObj) {
                        // Remover classes de cores anteriores
                        group.className = group.className.replace(/card-\w+/g, '').trim();
                        if (!group.classList.contains('group')) {
                            group.classList.add('group');
                        }
                        
                        // Aplicar a classe de cor salva
                        group.classList.add(`card-${savedColor}`);
                    }
                }
            }
        });
    }
});
