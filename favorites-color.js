/**
 * Gerenciador de cores para o container de favoritos
 * Permite que o usuário personalize a cor do container de favoritos
 * com uma interface similar aos cards coloridos do sistema
 */
document.addEventListener('DOMContentLoaded', function() {
    const favoritesContainer = document.getElementById('favorites-container');
    const colorOptions = document.querySelectorAll('.color-option');
    const colorPickerBtn = document.getElementById('color-picker-btn');
    const colorPalette = document.getElementById('color-palette');
    
    // Função para extrair a cor base do rgba
    function extractBaseColor(rgbaColor) {
        // Extrai os valores RGB do formato rgba(r, g, b, a)
        const match = rgbaColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
        if (match) {
            const r = parseInt(match[1]);
            const g = parseInt(match[2]);
            const b = parseInt(match[3]);
            // Converte para formato hexadecimal
            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        }
        return null;
    }
    
    // Função para ajustar a borda baseada na cor selecionada
    function updateBorderColor(rgbaColor) {
        const baseColor = extractBaseColor(rgbaColor);
        if (baseColor) {
            // Usa uma versão mais sólida da mesma cor para a borda
            const borderColor = rgbaColor.replace('0.35', '0.6');
            favoritesContainer.style.borderColor = borderColor;
        }
    }
    
    // Carregar a cor salva do localStorage
    const savedColor = localStorage.getItem('favoritesContainerColor');
    if (savedColor) {
        favoritesContainer.style.background = savedColor;
        updateBorderColor(savedColor);
        
        // Adicionar classe ativa à cor selecionada
        colorOptions.forEach(option => {
            if (option.dataset.color === savedColor) {
                option.classList.add('active');
            }
        });
    } else {
        // Se não houver cor salva, marcar a primeira opção como padrão
        if (colorOptions.length > 0) {
            colorOptions[0].classList.add('active');
        }
    }
    
    // Abrir/fechar a paleta de cores ao clicar no botão
    colorPickerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        colorPalette.classList.toggle('show');
    });
    
    // Fechar a paleta ao clicar fora dela
    document.addEventListener('click', function(e) {
        if (!colorPalette.contains(e.target) && e.target !== colorPickerBtn) {
            colorPalette.classList.remove('show');
        }
    });
    
    // Adicionar evento de clique a cada opção de cor
    colorOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Remover classe ativa de todas as opções
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Adicionar classe ativa à opção clicada
            this.classList.add('active');
            
            // Obter a cor selecionada
            const selectedColor = this.dataset.color;
            
            // Aplicar a cor ao container de favoritos
            favoritesContainer.style.background = selectedColor;
            
            // Atualizar a cor da borda
            updateBorderColor(selectedColor);
            
            // Salvar a cor no localStorage
            localStorage.setItem('favoritesContainerColor', selectedColor);
            
            // Fechar a paleta após selecionar uma cor
            colorPalette.classList.remove('show');
            // Efeito visual de feedback
            favoritesContainer.classList.add('color-changed');
            setTimeout(() => {
                favoritesContainer.classList.remove('color-changed');
            }, 500);
        });
    });
});
