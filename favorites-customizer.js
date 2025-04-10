const favoritesColors = [
    // Cores Gradientes
    {
        background: 'linear-gradient(135deg, rgba(32, 40, 119, 0.25), rgba(78, 156, 240, 0.15))',
        border: 'rgba(90, 155, 255, 0.3)',
        name: 'Azul Futurista'
    },
    {
        background: 'linear-gradient(135deg, rgba(120, 255, 214, 0.2), rgba(56, 239, 125, 0.15))',
        border: 'rgba(56, 239, 125, 0.3)',
        name: 'Verde Neon'
    },
    {
        background: 'linear-gradient(135deg, rgba(255, 93, 241, 0.2), rgba(134, 65, 244, 0.15))',
        border: 'rgba(189, 85, 255, 0.3)',
        name: 'Roxo Vibe'
    },
    {
        background: 'linear-gradient(135deg, rgba(255, 121, 85, 0.2), rgba(255, 205, 85, 0.15))',
        border: 'rgba(255, 150, 50, 0.3)',
        name: 'Laranja Calor'
    },
    // Cores Sólidas
    {
        background: 'rgba(59, 130, 246, 0.15)',
        border: 'rgba(59, 130, 246, 0.3)',
        name: 'Azul Sólido'
    },
    {
        background: 'rgba(16, 185, 129, 0.15)',
        border: 'rgba(16, 185, 129, 0.3)',
        name: 'Verde Sólido'
    },
    {
        background: 'rgba(236, 72, 153, 0.15)',
        border: 'rgba(236, 72, 153, 0.3)',
        name: 'Rosa Sólido'
    },
    {
        background: 'rgba(245, 158, 11, 0.15)',
        border: 'rgba(245, 158, 11, 0.3)',
        name: 'Âmbar Sólido'
    },
    {
        background: 'rgba(139, 92, 246, 0.15)',
        border: 'rgba(139, 92, 246, 0.3)',
        name: 'Violeta Sólido'
    },
    // Padrões e Estampas
    {
        background: 'repeating-linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0px, rgba(59, 130, 246, 0.1) 10px, rgba(59, 130, 246, 0.05) 10px, rgba(59, 130, 246, 0.05) 20px)',
        border: 'rgba(59, 130, 246, 0.3)',
        name: 'Listras Diagonais'
    },
    {
        background: 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0.1) 10%, transparent 10.2%, transparent 20%, rgba(236, 72, 153, 0.1) 20.2%, rgba(236, 72, 153, 0.1) 30%, transparent 30.2%, transparent 40%, rgba(236, 72, 153, 0.1) 40.2%, rgba(236, 72, 153, 0.1) 50%, transparent 50.2%)',
        border: 'rgba(236, 72, 153, 0.3)',
        name: 'Círculos Concêntricos'
    },
    {
        background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1) 25%, transparent 25%, transparent 75%, rgba(139, 92, 246, 0.1) 75%), linear-gradient(45deg, rgba(139, 92, 246, 0.1) 25%, transparent 25%, transparent 75%, rgba(139, 92, 246, 0.1) 75%)',
        border: 'rgba(139, 92, 246, 0.3)',
        name: 'Xadrez'
    },
    {
        background: 'radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.1) 5%, transparent 5.1%), radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.1) 5%, transparent 5.1%), radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.1) 5%, transparent 5.1%)',
        border: 'rgba(16, 185, 129, 0.3)',
        name: 'Bolinhas'
    },
    // Temas Especiais
    {
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%) -10px 0, linear-gradient(225deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%) -10px 0, linear-gradient(315deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%), linear-gradient(45deg, rgba(0, 0, 0, 0.05) 25%, transparent 25%)',
        border: 'rgba(75, 85, 99, 0.3)',
        name: 'Geométrico'
    },
    {
        background: 'linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        border: 'rgba(255, 255, 255, 0.2)',
        name: 'Grid'
    },
    {
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 70%)',
        border: 'rgba(255, 255, 255, 0.15)',
        name: 'Spotlight'
    },
    {
        background: 'linear-gradient(135deg, rgba(250, 250, 250, 0.15), rgba(255, 255, 255, 0.1))',
        border: 'rgba(255, 255, 255, 0.2)',
        name: 'Branco Translúcido'
    }
];





// Inicializar o personalizador de favoritos
function initFavoritesCustomizer() {
    const favoritesContainer = document.querySelector('.favorites-container');
    const favoritesHeader = document.querySelector('.favorites-header');
    
    if (!favoritesContainer || !favoritesHeader) {
        console.error('Containers não encontrados');
        return;
    }
    
    // Criar overlay se ainda não existir
    let overlay = document.querySelector('.color-panel-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'color-panel-overlay';
        document.body.appendChild(overlay);
    }
    
    // Criar botão de personalização se ainda não existir
    let customizeBtn = document.querySelector('.favorites-customize-btn');
    if (!customizeBtn) {
        customizeBtn = document.createElement('button');
        customizeBtn.className = 'favorites-customize-btn';
        customizeBtn.title = 'Personalizar cor do container';
        customizeBtn.innerHTML = '<i class="bi bi-palette"></i> <span class="favorites-customize-label">Cores</span>';
        // Inserir o botão após o título dos favoritos
        const favoritesTitle = favoritesHeader.querySelector('h3');
        if (favoritesTitle) {
            favoritesTitle.insertAdjacentElement('afterend', customizeBtn);
        } else {
            favoritesHeader.appendChild(customizeBtn);
        }
    }
    
    // Criar painel de cores se ainda não existir
    let colorPanel = document.querySelector('.favorites-color-panel');
    if (!colorPanel) {
        colorPanel = document.createElement('div');
        colorPanel.className = 'favorites-color-panel';
        document.body.appendChild(colorPanel);
        
        // Adicionar título ao painel
        const panelTitle = document.createElement('div');
        panelTitle.className = 'favorites-color-panel-title';
        panelTitle.textContent = 'Escolha um tema';
        colorPanel.appendChild(panelTitle);
        
        // Container para as opções de cores
        const colorOptionsContainer = document.createElement('div');
        colorOptionsContainer.className = 'favorites-color-options-container';
        colorPanel.appendChild(colorOptionsContainer);
        
        // Adicionar opções de cores ao painel
        favoritesColors.forEach(color => {
            const colorOption = document.createElement('div');
            colorOption.className = 'favorites-color-option';
            colorOption.style.background = color.background;
            colorOption.style.border = `2px solid ${color.border}`;
            colorOption.title = color.name;
            
            // Adicionar nome da cor abaixo da opção
            const colorName = document.createElement('span');
            colorName.className = 'favorites-color-name';
            colorName.textContent = color.name;
            
            const colorWrapper = document.createElement('div');
            colorWrapper.className = 'favorites-color-wrapper';
            colorWrapper.appendChild(colorOption);
            colorWrapper.appendChild(colorName);
            
            colorWrapper.addEventListener('click', function() {
                // Remover a classe selected de todas as opções
                document.querySelectorAll('.favorites-color-wrapper').forEach(wrapper => {
                    wrapper.classList.remove('selected');
                });
                
                // Adicionar a classe selected à opção clicada
                this.classList.add('selected');
                
                // Aplicar a cor ao container com transição suave
                favoritesContainer.style.transition = 'background 0.3s ease, border-color 0.3s ease';
                favoritesContainer.style.background = color.background;
                favoritesContainer.style.borderColor = color.border;
                
                // Salvar a preferência no localStorage
                localStorage.setItem('favoritesContainerColor', color.background);
                localStorage.setItem('favoritesContainerBorder', color.border);
                localStorage.setItem('favoritesContainerColorName', color.name);
                
                // Fechar o painel e overlay com atraso para feedback visual
                setTimeout(() => {
                    colorPanel.style.display = 'none';
                    overlay.style.display = 'none';
                }, 300);
                
                // Adicionar efeito visual de feedback
                favoritesContainer.classList.add('color-changed');
                setTimeout(() => {
                    favoritesContainer.classList.remove('color-changed');
                }, 500);
                
                showFeedbackMessage(`Tema ${color.name} aplicado com sucesso!`);
            });
            
            colorOptionsContainer.appendChild(colorWrapper);
        });
    }
    
    // Configurar evento de clique no botão
    customizeBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        event.preventDefault();
        
        const isOpen = colorPanel.style.display === 'block';
        
        if (isOpen) {
            colorPanel.style.display = 'none';
            overlay.style.display = 'none';
        } else {
            colorPanel.style.display = 'block';
            overlay.style.display = 'block';
            
            // Marcar a cor atual como selecionada
            const currentColor = localStorage.getItem('favoritesContainerColor');
            const currentColorName = localStorage.getItem('favoritesContainerColorName');
            
            document.querySelectorAll('.favorites-color-wrapper').forEach(wrapper => {
                wrapper.classList.remove('selected');
                const colorOption = wrapper.querySelector('.favorites-color-option');
                if (currentColor && colorOption.style.background === currentColor) {
                    wrapper.classList.add('selected');
                }
            });
            
            // Se não encontrou a cor pelo background, tentar pelo nome
            if (currentColorName && !document.querySelector('.favorites-color-wrapper.selected')) {
                const colorWrappers = document.querySelectorAll('.favorites-color-wrapper');
                for (let wrapper of colorWrappers) {
                    if (wrapper.querySelector('.favorites-color-name').textContent === currentColorName) {
                        wrapper.classList.add('selected');
                        break;
                    }
                }
            }
        }
    });
    
    // Fechar o painel quando clicar no overlay
    overlay.addEventListener('click', function() {
        colorPanel.style.display = 'none';
        overlay.style.display = 'none';
    });
    
    // Fechar o painel quando pressionar ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            colorPanel.style.display = 'none';
            overlay.style.display = 'none';
        }
    });
    
    // Carregar cor salva, se existir
    const savedBackground = localStorage.getItem('favoritesContainerColor');
    const savedBorder = localStorage.getItem('favoritesContainerBorder');
    
    if (savedBackground && savedBorder) {
        favoritesContainer.style.background = savedBackground;
        favoritesContainer.style.borderColor = savedBorder;
    }
}

// Adicionar estilo CSS para a mensagem de feedback
function addFeedbackStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .favorites-container {
            transition: background 0.3s ease, border-color 0.3s ease;
        }
        
        .color-panel-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 998;
        }
        
        .favorites-customize-btn {
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 5px 10px;
            display: flex;
            align-items: center;
            gap: 5px;
            transition: all 0.2s ease;
            border-radius: 4px;
        }
        
        .favorites-customize-btn:hover {
            background: rgba(0, 0, 0, 0.05);
        }
        
        .favorites-customize-btn i {
            font-size: 1.1em;
        }
        
        .favorites-customize-label {
            font-size: 0.9em;
        }
        
        .favorites-color-panel {
            display: none;
            position: fixed;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            padding: 15px;
            z-index: 999;
            min-width: 280px;
            max-width: 90vw;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .favorites-color-panel-title {
            font-size: 1.1em;
            font-weight: 500;
            margin-bottom: 15px;
            color: #333;
            text-align: center;
        }
        
        .favorites-color-options-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
            gap: 15px;
            padding: 5px;
        }
        
        .favorites-color-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            padding: 5px;
            border-radius: 6px;
            transition: transform 0.2s ease, background 0.2s ease;
        }
        
        .favorites-color-wrapper:hover {
            transform: translateY(-2px);
            background: rgba(0, 0, 0, 0.02);
        }
        
        .favorites-color-wrapper.selected {
            background: rgba(0, 0, 0, 0.05);
        }
        
        .favorites-color-option {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .favorites-color-wrapper:hover .favorites-color-option {
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .favorites-color-wrapper.selected .favorites-color-option {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .favorites-color-name {
            font-size: 0.8em;
            color: #666;
            text-align: center;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .color-changed {
            animation: colorChangeEffect 0.5s ease;
        }
        
        @keyframes colorChangeEffect {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.02);
            }
            100% {
                transform: scale(1);
            }
        }
        
        /* Estilo para a barra de rolagem personalizada */
        .favorites-color-panel::-webkit-scrollbar {
            width: 8px;
        }
        
        .favorites-color-panel::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
        }
        
        .favorites-color-panel::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
        }
        
        .favorites-color-panel::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
        
        /* Feedback messages */
        .feedback-message {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            z-index: 1000;
            font-size: 0.9em;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .feedback-message.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

function showFeedbackMessage(message, duration = 2000) {
    const existingMessage = document.querySelector('.feedback-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const feedbackMessage = document.createElement('div');
    feedbackMessage.className = 'feedback-message';
    feedbackMessage.textContent = message;
    document.body.appendChild(feedbackMessage);

    // Força um reflow para garantir que a transição funcione
    feedbackMessage.offsetHeight;
    feedbackMessage.classList.add('show');

    setTimeout(() => {
        feedbackMessage.classList.remove('show');
        setTimeout(() => {
            feedbackMessage.remove();
        }, 300);
    }, duration);
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initFavoritesCustomizer();
    
    // Adicionar estilos para feedback
    addFeedbackStyles();
});
