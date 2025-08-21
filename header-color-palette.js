/**
 * Sistema de Paleta de Cores para o Header
 * Permite ao usuário alterar a cor do header dinamicamente
 */

class HeaderColorPalette {
    constructor() {
        this.modal = null;
        this.toggleButton = null;
        this.colorOptions = [];
        this.currentColor = null;
        this.defaultColor = '#007bff';
        this.storageKey = 'headerCustomColor';
        
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.loadSavedColor();
    }

    setupElements() {
        this.modal = document.getElementById('color-palette-modal');
        this.toggleButton = document.getElementById('header-color-toggle');
        this.colorOptions = document.querySelectorAll('.color-option');
        this.closeButton = document.getElementById('close-color-palette');
        this.resetButton = document.getElementById('reset-header-color');
    }

    setupEventListeners() {
        // Botão para abrir o modal
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal();
            });
        }

        // Botão para fechar o modal
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => {
                this.closeModal();
            });
        }

        // Fechar modal clicando fora dele
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        // Opções de cores
        this.colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                const color = option.dataset.color;
                this.selectColor(color);
            });
        });

        // Botão de reset
        if (this.resetButton) {
            this.resetButton.addEventListener('click', () => {
                this.resetToDefault();
            });
        }

        // Fechar modal com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }

    openModal() {
        if (this.modal) {
            this.modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            this.updateSelectedOption();
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    selectColor(color) {
        this.currentColor = color;
        this.applyColor(color);
        this.saveColor(color);
        this.updateSelectedOption();
        
        // Fechar modal após seleção
        setTimeout(() => {
            this.closeModal();
        }, 300);
    }

    applyColor(color) {
        const header = document.querySelector('.header');
        if (header) {
            // Aplicar cor de fundo
            header.style.background = `linear-gradient(135deg, ${color}, ${this.darkenColor(color, 20)})`;
            
            // Ajustar cor do texto baseado no contraste
            const textColor = this.getContrastColor(color);
            header.style.color = textColor;
            
            // Aplicar cor aos elementos filhos
            this.updateChildElements(header, textColor);
        }
    }

    updateChildElements(header, textColor) {
        // Atualizar cor dos títulos
        const titles = header.querySelectorAll('h1, h2, h3, .app-title');
        titles.forEach(title => {
            title.style.color = textColor;
        });

        // Atualizar cor dos ícones
        const icons = header.querySelectorAll('i');
        icons.forEach(icon => {
            icon.style.color = textColor;
        });

        // Atualizar botões do header
        const buttons = header.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.color = textColor;
            button.addEventListener('mouseenter', () => {
                button.style.backgroundColor = this.addOpacity(textColor, 0.1);
            });
            button.addEventListener('mouseleave', () => {
                button.style.backgroundColor = 'transparent';
            });
        });
    }

    getContrastColor(hexColor) {
        // Converter hex para RGB
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        
        // Calcular luminância
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Retornar cor baseada no contraste
        return luminance > 0.5 ? '#1e293b' : '#ffffff';
    }

    darkenColor(hexColor, percent) {
        const num = parseInt(hexColor.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16).slice(1);
    }

    addOpacity(hexColor, opacity) {
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    updateSelectedOption() {
        this.colorOptions.forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.color === this.currentColor) {
                option.classList.add('selected');
            }
        });
    }

    saveColor(color) {
        try {
            localStorage.setItem(this.storageKey, color);
        } catch (error) {
            console.warn('Não foi possível salvar a cor no localStorage:', error);
        }
    }

    loadSavedColor() {
        try {
            const savedColor = localStorage.getItem(this.storageKey);
            if (savedColor) {
                this.currentColor = savedColor;
                this.applyColor(savedColor);
            } else {
                this.currentColor = this.defaultColor;
            }
        } catch (error) {
            console.warn('Não foi possível carregar a cor do localStorage:', error);
            this.currentColor = this.defaultColor;
        }
    }

    resetToDefault() {
        this.selectColor(this.defaultColor);
        try {
            localStorage.removeItem(this.storageKey);
        } catch (error) {
            console.warn('Não foi possível remover a cor do localStorage:', error);
        }
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new HeaderColorPalette();
});

// Exportar para uso em outros módulos se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderColorPalette;
}