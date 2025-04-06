const favoritesColors = [
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
    {
        background: 'linear-gradient(135deg, rgba(250, 250, 250, 0.15), rgba(255, 255, 255, 0.1))',
        border: 'rgba(255, 255, 255, 0.2)',
        name: 'Branco Translúcido'
    }
];





// Inicializar o personalizador de favoritos
function initFavoritesCustomizer() {
    const favoritesContainer = document.querySelector('.favorites-container');
    
    if (!favoritesContainer) return;
    
    // Criar botão de personalização
    const customizeBtn = document.createElement('div');
    customizeBtn.className = 'favorites-customize-btn';
    customizeBtn.title = 'Personalizar cor do container';
    
    // Adicionar rótulo ao botão
    const btnLabel = document.createElement('span');
    btnLabel.className = 'favorites-customize-label';
    btnLabel.textContent = 'Cores';
    customizeBtn.appendChild(btnLabel);
    
    // Criar painel de cores
    const colorPanel = document.createElement('div');
    colorPanel.className = 'favorites-color-panel';
    
    // Adicionar opções de cores ao painel
    favoritesColors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.className = 'favorites-color-option';
        colorOption.style.background = color.background;
        colorOption.title = color.name;
        
        // Aplicar cor ao container quando clicado
        colorOption.addEventListener('click', function() {
            // Remover a classe selected de todas as opções
            document.querySelectorAll('.favorites-color-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Adicionar a classe selected à opção clicada
            this.classList.add('selected');
            
            // Aplicar a cor ao container
            favoritesContainer.style.background = color.background;
            favoritesContainer.style.borderColor = color.border;
            
            // Salvar a preferência no localStorage
            localStorage.setItem('favoritesContainerColor', color.background);
            localStorage.setItem('favoritesContainerBorder', color.border);
            localStorage.setItem('favoritesContainerColorName', color.name);
            
            // Fechar o painel
            colorPanel.style.display = 'none';
        });
        
        colorPanel.appendChild(colorOption);
    });
    
    // Abrir/fechar painel ao clicar no botão
    customizeBtn.addEventListener('click', function(event) {
        if (colorPanel.style.display === 'flex') {
            colorPanel.style.display = 'none';
        } else {
            // Marcar a cor atual como selecionada
            const currentColor = localStorage.getItem('favoritesContainerColor');
            const currentColorName = localStorage.getItem('favoritesContainerColorName');
            
            // Remover a classe selected de todas as opções
            document.querySelectorAll('.favorites-color-option').forEach(option => {
                option.classList.remove('selected');
                
                // Se a cor atual corresponder a esta opção, marcá-la como selecionada
                if (currentColor && option.style.background === currentColor) {
                    option.classList.add('selected');
                }
            });
            
            // Se não encontrou a cor pelo background, tentar pelo nome
            if (currentColorName && !document.querySelector('.favorites-color-option.selected')) {
                const colorOptions = document.querySelectorAll('.favorites-color-option');
                for (let i = 0; i < colorOptions.length; i++) {
                    if (colorOptions[i].title === currentColorName) {
                        colorOptions[i].classList.add('selected');
                        break;
                    }
                }
            }
            
            colorPanel.style.display = 'flex';
        }
        
        event.stopPropagation();
    });
    
    // Fechar o painel quando clicar fora dele
    document.addEventListener('click', function() {
        colorPanel.style.display = 'none';
    });
    
    colorPanel.addEventListener('click', function(event) {
        event.stopPropagation();
    });
    
    // Adicionar elementos ao DOM
    favoritesContainer.appendChild(customizeBtn);
    favoritesContainer.appendChild(colorPanel);
    
    // Carregar cor salva, se existir
    const savedBackground = localStorage.getItem('favoritesContainerColor');
    const savedBorder = localStorage.getItem('favoritesContainerBorder');
    
    if (savedBackground && savedBorder) {
        favoritesContainer.style.background = savedBackground;
        favoritesContainer.style.borderColor = savedBorder;
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initFavoritesCustomizer);
