// Cores predefinidas para os botões
const buttonColors = {
    blue: {
        gradient: ['#60A5FA', '#3B82F6'],
        hoverGradient: ['#3B82F6', '#2563EB'],
        iconColor: '#BFDBFE',
        darkGradient: ['#3B82F6', '#2563EB'],
        darkHoverGradient: ['#60A5FA', '#3B82F6']
    },
    purple: {
        gradient: ['#8B5CF6', '#6D28D9'],
        hoverGradient: ['#7C3AED', '#5B21B6'],
        iconColor: '#DDD6FE',
        darkGradient: ['#6D28D9', '#4C1D95'],
        darkHoverGradient: ['#8B5CF6', '#6D28D9']
    },
    teal: {
        gradient: ['#06B6D4', '#0891B2'],
        hoverGradient: ['#0E7490', '#0369A1'],
        iconColor: '#A5F3FC',
        darkGradient: ['#0E7490', '#155E75'],
        darkHoverGradient: ['#06B6D4', '#0891B2']
    },
    rose: {
        gradient: ['#F43F5E', '#E11D48'],
        hoverGradient: ['#BE123C', '#9F1239'],
        iconColor: '#FECDD3',
        darkGradient: ['#BE123C', '#881337'],
        darkHoverGradient: ['#F43F5E', '#E11D48']
    },
    amber: {
        gradient: ['#F59E0B', '#D97706'],
        hoverGradient: ['#B45309', '#92400E'],
        iconColor: '#FDE68A',
        darkGradient: ['#B45309', '#78350F'],
        darkHoverGradient: ['#F59E0B', '#D97706']
    },
    emerald: {
        gradient: ['#10B981', '#059669'],
        hoverGradient: ['#047857', '#065F46'],
        iconColor: '#A7F3D0',
        darkGradient: ['#047857', '#064E3B'],
        darkHoverGradient: ['#10B981', '#059669']
    }
};

// Função para salvar a ordem dos botões no localStorage
function saveButtonOrder(groupId, order) {
    localStorage.setItem(`buttonOrder_${groupId}`, JSON.stringify(order));
}

// Função para carregar a ordem dos botões do localStorage
function loadButtonOrder(groupId) {
    const savedOrder = localStorage.getItem(`buttonOrder_${groupId}`);
    return savedOrder ? JSON.parse(savedOrder) : null;
}

// Função para salvar a cor do botão no localStorage
function saveButtonColor(buttonId, color) {
    localStorage.setItem(`buttonColor_${buttonId}`, color);
}

// Função para carregar a cor do botão do localStorage
function loadButtonColor(buttonId) {
    return localStorage.getItem(`buttonColor_${buttonId}`);
}

// Função para aplicar a cor ao botão
function applyButtonColor(button, colorName) {
    const color = buttonColors[colorName];
    if (!color) return;

    const gradient = `linear-gradient(135deg, ${color.gradient[0]}, ${color.gradient[1]})`;
    const hoverGradient = `linear-gradient(135deg, ${color.hoverGradient[0]}, ${color.hoverGradient[1]})`;

    button.style.setProperty('--button-gradient', gradient);
    button.style.setProperty('--button-hover-gradient', hoverGradient);
    button.style.backgroundImage = gradient;
    button.style.boxShadow = `0 2px 4px ${color.gradient[0]}33`;
    
    const icon = button.querySelector('i');
    if (icon) {
        icon.style.color = color.iconColor;
    }

    saveButtonColor(button.getAttribute('data-button-id'), colorName);
}

// Função para criar o menu de cores
function createColorMenu(button) {
    const menu = document.createElement('div');
    menu.className = 'color-menu';
    
    Object.keys(buttonColors).forEach(colorName => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.style.background = `linear-gradient(135deg, ${buttonColors[colorName].gradient[0]}, ${buttonColors[colorName].gradient[1]})`;
        colorOption.onclick = () => {
            applyButtonColor(button, colorName);
            menu.remove();
        };
        menu.appendChild(colorOption);
    });

    return menu;
}

// Inicializar drag and drop e personalização de cores
function initializeCustomization() {
    // Adicionar IDs únicos aos botões se não existirem
    document.querySelectorAll('.button-container button').forEach((button, index) => {
        if (!button.getAttribute('data-button-id')) {
            button.setAttribute('data-button-id', `button_${index}`);
        }

        // Carregar cor salva ou usar azul como padrão
        const savedColor = loadButtonColor(button.getAttribute('data-button-id'));
        if (savedColor) {
            applyButtonColor(button, savedColor);
        } else {
            // Definir azul como cor padrão
            applyButtonColor(button, 'blue');
        }

        // Adicionar menu de contexto para cores
        button.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const existingMenu = document.querySelector('.color-menu');
            if (existingMenu) {
                existingMenu.remove();
            }

            const menu = createColorMenu(button);
            menu.style.position = 'absolute';
            menu.style.left = `${e.pageX}px`;
            menu.style.top = `${e.pageY}px`;
            document.body.appendChild(menu);

            // Fechar menu ao clicar fora
            document.addEventListener('click', function closeMenu(e) {
                if (!menu.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        });
    });

    // Inicializar drag and drop para cada grupo
    document.querySelectorAll('.button-container').forEach(container => {
        new Sortable(container, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            onEnd: function(evt) {
                const buttons = Array.from(evt.target.children).map(button => 
                    button.getAttribute('data-button-id')
                );
                saveButtonOrder(evt.target.closest('.group').id, buttons);
            }
        });

        // Carregar ordem salva
        const groupId = container.closest('.group').id;
        const savedOrder = loadButtonOrder(groupId);
        if (savedOrder) {
            const buttonMap = new Map();
            container.querySelectorAll('button').forEach(button => {
                buttonMap.set(button.getAttribute('data-button-id'), button);
            });

            savedOrder.forEach(buttonId => {
                const button = buttonMap.get(buttonId);
                if (button) {
                    container.appendChild(button);
                }
            });
        }
    });
}

// Adicionar estilos necessários
const style = document.createElement('style');
style.textContent = `
    .color-menu {
        position: absolute;
        background: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4px;
    }

    .color-option {
        width: 24px;
        height: 24px;
        border-radius: 4px;
        cursor: pointer;
        transition: transform 0.2s;
    }

    .color-option:hover {
        transform: scale(1.1);
    }

    .sortable-ghost {
        opacity: 0.5;
    }

    .button-container button {
        transition: all 0.3s ease;
        background-color: transparent !important;
    }

    .button-container button:hover {
        transform: translateX(5px);
    }
`;
document.head.appendChild(style);

// Carregar Sortable.js
const sortableScript = document.createElement('script');
sortableScript.src = 'https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js';
sortableScript.onload = initializeCustomization;
document.head.appendChild(sortableScript);
