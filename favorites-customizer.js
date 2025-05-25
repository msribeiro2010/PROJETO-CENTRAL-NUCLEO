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
    },
    // Cores Sólidas adicionais
    {
        background: '#e11d48',
        border: '#e11d48',
        name: 'Vermelho Sólido'
    },
    {
        background: '#facc15',
        border: '#facc15',
        name: 'Amarelo Sólido'
    },
    {
        background: '#64748b',
        border: '#64748b',
        name: 'Cinza Sólido'
    },
    {
        background: '#18181b',
        border: '#18181b',
        name: 'Preto Sólido'
    },
    {
        background: '#1e293b',
        border: '#1e293b',
        name: 'Azul Escuro Sólido'
    },
    {
        background: '#166534',
        border: '#166534',
        name: 'Verde Escuro Sólido'
    },
    // Estampas com ícones de TI e emojis
    {
        background: "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'><text x=\'0\' y=\'25\' font-size=\'24\'>💻</text></svg>') repeat #f1f5f9",
        border: '#3b82f6',
        name: 'TI 💻'
    },
    {
        background: "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'><text x=\'0\' y=\'25\' font-size=\'24\'>🖥️</text></svg>') repeat #f1f5f9",
        border: '#64748b',
        name: 'Desktop 🖥️'
    },
    {
        background: "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'><text x=\'0\' y=\'25\' font-size=\'24\'>🛡️</text></svg>') repeat #f1f5f9",
        border: '#7f56d9',
        name: 'Segurança 🛡️'
    },
    {
        background: "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'><text x=\'0\' y=\'25\' font-size=\'24\'>⚡</text></svg>') repeat #f1f5f9",
        border: '#facc15',
        name: 'Energia ⚡'
    },
    {
        background: "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'><text x=\'0\' y=\'25\' font-size=\'24\'>🌐</text></svg>') repeat #f1f5f9",
        border: '#3b82f6',
        name: 'Web 🌐'
    },
    {
        background: "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'><text x=\'0\' y=\'25\' font-size=\'24\'>🔒</text></svg>') repeat #f1f5f9",
        border: '#18181b',
        name: 'Privacidade 🔒'
    },
    {
        background: "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'><text x=\'0\' y=\'28\' font-size=\'32\'>🐭</text></svg>') repeat #f1f5f9",
        border: '#64748b',
        name: 'Rato Correndo',
        animated: true
    },
    {
        background: "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'><text x=\'0\' y=\'28\' font-size=\'32\'>🐱</text></svg>') repeat #f1f5f9",
        border: '#e11d48',
        name: 'Gato Curioso',
        animated: true
    },
    {
        background: "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'><text x=\'0\' y=\'28\' font-size=\'32\'>👁️</text></svg>') repeat #f1f5f9",
        border: '#3b82f6',
        name: 'Olho Observador',
        animated: true
    },
    {
        background: '#111',
        border: '#39ff14',
        name: 'Matrix',
        animated: true,
        matrix: true
    }
];

// Adicionar novas opções de cores animadas e com desenhos
const animatedColors = [
    {
        background: 'linear-gradient(270deg, #ff6b6b, #fcd34d, #6c5ce7, #a8e6cf, #ff8787)',
        border: '#ff6b6b',
        name: 'Arco-íris',
        animated: true
    },
    {
        background: 'repeating-linear-gradient(45deg, #3182ce 0 10px, #fff 10px 20px)',
        border: '#3182ce',
        name: 'Listras'
    },
    {
        background: 'radial-gradient(circle at 10px 10px, #3182ce 8px, transparent 8px), radial-gradient(circle at 30px 30px, #fcd34d 8px, transparent 8px)',
        border: '#3182ce',
        name: 'Bolinhas'
    },
    {
        background: 'repeating-linear-gradient(135deg, #fcd34d 0 8px, #fff 8px 16px)',
        border: '#fcd34d',
        name: 'Listras Amarelas'
    },
    {
        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed, #fcd34d, #ff6b6b)',
        border: '#8b5cf6',
        name: 'Violeta Mix',
        animated: true
    },
    {
        background: 'repeating-linear-gradient(90deg, #fff 0 10px, #3182ce 10px 20px)',
        border: '#3182ce',
        name: 'Quadriculado'
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
        customizeBtn.className = 'favorites-customize-btn favorites-customize-btn-compact';
        customizeBtn.title = 'Personalizar cor do container';
        customizeBtn.innerHTML = '<i class="bi bi-palette"></i>';
        customizeBtn.style.width = '26px';
        customizeBtn.style.height = '26px';
        customizeBtn.style.padding = '0';
        customizeBtn.style.border = '1px solid #e2e8f0';
        customizeBtn.style.background = '#fff';
        customizeBtn.style.display = 'flex';
        customizeBtn.style.alignItems = 'center';
        customizeBtn.style.justifyContent = 'center';
        customizeBtn.style.borderRadius = '50%';
        customizeBtn.style.boxShadow = 'none';
        customizeBtn.style.transition = 'border 0.2s, background 0.2s';
        customizeBtn.querySelector('i').style.fontSize = '1.1rem';
        customizeBtn.querySelector('i').style.color = '#3182ce';
        // Inserir o botão após o título dos favoritos
        const favoritesTitle = favoritesHeader.querySelector('h3');
        if (favoritesTitle) {
            favoritesTitle.insertAdjacentElement('afterend', customizeBtn);
        } else {
            favoritesHeader.appendChild(customizeBtn);
        }
    } else {
        // Se já existe, remova a legenda se houver
        const label = customizeBtn.querySelector('.favorites-customize-label');
        if (label) label.remove();
        customizeBtn.classList.add('favorites-customize-btn-compact');
        customizeBtn.style.width = '26px';
        customizeBtn.style.height = '26px';
        customizeBtn.style.padding = '0';
        customizeBtn.style.border = '1px solid #e2e8f0';
        customizeBtn.style.background = '#fff';
        customizeBtn.style.display = 'flex';
        customizeBtn.style.alignItems = 'center';
        customizeBtn.style.justifyContent = 'center';
        customizeBtn.style.borderRadius = '50%';
        customizeBtn.style.boxShadow = 'none';
        customizeBtn.style.transition = 'border 0.2s, background 0.2s';
        if (customizeBtn.querySelector('i')) {
            customizeBtn.querySelector('i').style.fontSize = '1.1rem';
            customizeBtn.querySelector('i').style.color = '#3182ce';
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
                // Garante que o background inline prevaleça
                favoritesContainer.style.setProperty('background', color.background, 'important');
                favoritesContainer.style.setProperty('border-color', color.border, 'important');
                
                // Se o tema for muito claro/transparente e estiver no modo claro, aumenta opacidade
                const isLight = !document.body.classList.contains('dark') && window.matchMedia('(prefers-color-scheme: light)').matches;
                if (isLight && color.background.match(/rgba\((\d+), (\d+), (\d+), (0\.[0-3])\)/)) {
                  // Se for muito transparente, aumenta opacidade
                  const newBg = color.background.replace(/rgba\((\d+), (\d+), (\d+), (0\.[0-3])\)/g, 'rgba($1, $2, $3, 0.12)');
                  favoritesContainer.style.setProperty('background', newBg, 'important');
                }
                
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
                favoritesContainer.classList.toggle('animated-bg', !!color.animated);
                setTimeout(() => {
                    favoritesContainer.classList.remove('color-changed');
                }, 500);
                
                showFeedbackMessage(`Tema ${color.name} aplicado com sucesso!`);

                const emojiMap = {
                    'TI 💻': '💻',
                    'Desktop 🖥️': '🖥️',
                    'Segurança 🛡️': '🛡️',
                    'Energia ⚡': '⚡',
                    'Web 🌐': '🌐',
                    'Privacidade 🔒': '🔒',
                };
                if (emojiMap[color.name]) {
                    showFavoritesEmoji(emojiMap[color.name]);
                } else {
                    hideFavoritesEmoji();
                }

                if (color.name === 'Matrix') {
                    showMatrixEffect();
                } else {
                    hideMatrixEffect();
                }
            });
            
            if (color.animated) {
                colorOption.classList.add('animated-bg');
                colorOption.style.backgroundSize = '40px 40px';
            } else if (color.background && color.background.includes('svg+xml')) {
                colorOption.style.backgroundSize = '40px 40px';
            }
            
            colorOptionsContainer.appendChild(colorWrapper);
        });

        // Adicione as novas opções ao painel
        animatedColors.forEach(color => {
            const colorOption = document.createElement('div');
            colorOption.className = 'favorites-color-option';
            colorOption.style.background = color.background;
            colorOption.style.border = `2px solid ${color.border}`;
            colorOption.title = color.name;
            if (color.animated) {
                colorOption.style.animation = 'animatedGradient 3s linear infinite';
                colorOption.classList.add('animated-bg');
                colorOption.style.backgroundSize = '40px 40px';
            }
            // Adicionar nome da cor abaixo da opção
            const colorName = document.createElement('span');
            colorName.className = 'favorites-color-name';
            colorName.textContent = color.name;
            const colorWrapper = document.createElement('div');
            colorWrapper.className = 'favorites-color-wrapper';
            colorWrapper.appendChild(colorOption);
            colorWrapper.appendChild(colorName);
            colorWrapper.addEventListener('click', function() {
                document.querySelectorAll('.favorites-color-wrapper').forEach(wrapper => {
                    wrapper.classList.remove('selected');
                });
                this.classList.add('selected');
                favoritesContainer.style.transition = 'background 0.3s ease, border-color 0.3s ease';
                favoritesContainer.style.background = color.background;
                favoritesContainer.style.borderColor = color.border;
                localStorage.setItem('favoritesContainerColor', color.background);
                localStorage.setItem('favoritesContainerBorder', color.border);
                localStorage.setItem('favoritesContainerColorName', color.name);
                setTimeout(() => {
                    colorPanel.style.display = 'none';
                    overlay.style.display = 'none';
                }, 300);
                favoritesContainer.classList.add('color-changed');
                favoritesContainer.classList.toggle('animated-bg', !!color.animated);
                setTimeout(() => {
                    favoritesContainer.classList.remove('color-changed');
                }, 500);
                showFeedbackMessage(`Tema ${color.name} aplicado com sucesso!`);

                const emojiMap = {
                    'TI 💻': '💻',
                    'Desktop 🖥️': '🖥️',
                    'Segurança 🛡️': '🛡️',
                    'Energia ⚡': '⚡',
                    'Web 🌐': '🌐',
                    'Privacidade 🔒': '🔒',
                };
                if (emojiMap[color.name]) {
                    showFavoritesEmoji(emojiMap[color.name]);
                } else {
                    hideFavoritesEmoji();
                }

                if (color.name === 'Matrix') {
                    showMatrixEffect();
                } else {
                    hideMatrixEffect();
                }
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
    const savedColorName = localStorage.getItem('favoritesContainerColorName');
    if (savedBackground && savedBorder) {
        favoritesContainer.style.background = savedBackground;
        favoritesContainer.style.borderColor = savedBorder;
        const colorObj = favoritesColors.find(c => c.name === savedColorName);
        if (colorObj && colorObj.animated) {
            favoritesContainer.classList.add('animated-bg');
            favoritesContainer.style.backgroundSize = '40px 40px';
        } else {
            favoritesContainer.classList.remove('animated-bg');
            favoritesContainer.style.backgroundSize = '';
        }
        if (colorObj && emojiMap[colorObj.name]) {
            showFavoritesEmoji(emojiMap[colorObj.name]);
        } else {
            hideFavoritesEmoji();
        }

        if (colorObj && colorObj.name === 'Matrix') {
            showMatrixEffect();
        } else {
            hideMatrixEffect();
        }
    }
}

// Adicionar estilo CSS para a mensagem de feedback
function addFeedbackStyles() {
    if (document.getElementById('favorites-animated-bg-style')) return;
    const style = document.createElement('style');
    style.id = 'favorites-animated-bg-style';
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

        @keyframes animatedGradient {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
        }
        .favorites-color-option[style*="animatedGradient"] {
            background-size: 400% 400%;
        }

        .animated-bg {
            animation: moveBg 2s linear infinite;
            background-position: 0 0;
            background-size: 40px 40px;
        }
        @keyframes moveBg {
            0% { background-position: 0 0; }
            100% { background-position: 80px 0; }
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

// Função para mostrar emoji grande no container
function showFavoritesEmoji(emoji) {
    let emojiSpan = document.getElementById('favorites-emoji-bg');
    if (!emojiSpan) {
        emojiSpan = document.createElement('span');
        emojiSpan.id = 'favorites-emoji-bg';
        emojiSpan.style.position = 'absolute';
        emojiSpan.style.top = '50%';
        emojiSpan.style.left = '50%';
        emojiSpan.style.transform = 'translate(-50%, -50%)';
        emojiSpan.style.fontSize = '5rem';
        emojiSpan.style.opacity = '0.18';
        emojiSpan.style.pointerEvents = 'none';
        emojiSpan.style.zIndex = '0';
        emojiSpan.style.userSelect = 'none';
        emojiSpan.style.transition = 'opacity 0.3s';
        document.querySelector('.favorites-container').appendChild(emojiSpan);
    }
    emojiSpan.textContent = emoji;
    emojiSpan.style.display = 'block';
}

function hideFavoritesEmoji() {
    const emojiSpan = document.getElementById('favorites-emoji-bg');
    if (emojiSpan) emojiSpan.style.display = 'none';
}

// Função para ativar/desativar o efeito Matrix
function showMatrixEffect() {
    let matrixCanvas = document.getElementById('favorites-matrix-canvas');
    if (!matrixCanvas) {
        matrixCanvas = document.createElement('canvas');
        matrixCanvas.id = 'favorites-matrix-canvas';
        matrixCanvas.style.position = 'absolute';
        matrixCanvas.style.top = '0';
        matrixCanvas.style.left = '0';
        matrixCanvas.style.width = '100%';
        matrixCanvas.style.height = '100%';
        matrixCanvas.style.zIndex = '0';
        matrixCanvas.style.pointerEvents = 'none';
        matrixCanvas.style.opacity = '0.22';
        matrixCanvas.style.userSelect = 'none';
        document.querySelector('.favorites-container').appendChild(matrixCanvas);
    }
    // Ajustar tamanho
    const container = document.querySelector('.favorites-container');
    matrixCanvas.width = container.offsetWidth;
    matrixCanvas.height = container.offsetHeight;
    // Matrix effect
    const ctx = matrixCanvas.getContext('2d');
    const letters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 18;
    const columns = Math.floor(matrixCanvas.width / fontSize);
    const drops = Array(columns).fill(1);
    function drawMatrix() {
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'rgba(17,17,17,0.18)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#00ff41';
            ctx.shadowColor = '#00ff41';
            ctx.shadowBlur = 8;
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            ctx.shadowBlur = 0;
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        ctx.globalAlpha = 1;
    }
    if (window.favoritesMatrixInterval) clearInterval(window.favoritesMatrixInterval);
    window.favoritesMatrixInterval = setInterval(drawMatrix, 60);
    // Redimensionar ao mudar tamanho do container
    window.addEventListener('resize', hideMatrixEffect);
}
function hideMatrixEffect() {
    const matrixCanvas = document.getElementById('favorites-matrix-canvas');
    if (matrixCanvas) matrixCanvas.remove();
    if (window.favoritesMatrixInterval) clearInterval(window.favoritesMatrixInterval);
    window.removeEventListener('resize', hideMatrixEffect);
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initFavoritesCustomizer();
    
    // Adicionar estilos para feedback
    addFeedbackStyles();
});
