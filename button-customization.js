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

// Verificar se o Sortable está disponível
function checkSortable() {
    if (typeof Sortable === 'undefined') {
        console.error('Sortable.js não está carregado!');
        return false;
    }
    return true;
}

// Função para salvar a ordem dos botões no localStorage
function saveButtonOrder(groupId, order) {
    localStorage.setItem(`buttonOrder_${groupId}`, JSON.stringify(order));
}

// Função para carregar a ordem dos botões do localStorage
function loadButtonOrder(groupId) {
    const savedOrder = localStorage.getItem(`buttonOrder_${groupId}`);
    return savedOrder ? JSON.parse(savedOrder) : null;
}

// Função para reordenar os botões baseado na ordem salva
function reorderButtons(container, order) {
    const buttons = Array.from(container.children);
    const orderedButtons = [];
    
    // Primeiro, criar um mapa dos botões existentes
    const buttonMap = new Map();
    buttons.forEach(button => {
        const id = button.getAttribute('data-button-id');
        buttonMap.set(id, button);
    });
    
    // Reordenar baseado na ordem salva
    order.forEach(id => {
        const button = buttonMap.get(id);
        if (button) {
            orderedButtons.push(button);
            buttonMap.delete(id);
        }
    });
    
    // Adicionar quaisquer botões novos que não estavam na ordem salva
    buttonMap.forEach(button => {
        orderedButtons.push(button);
    });
    
    // Limpar o container e adicionar os botões na nova ordem
    container.innerHTML = '';
    orderedButtons.forEach(button => container.appendChild(button));
}

// Função para salvar a cor do botão no localStorage
function saveButtonColor(buttonId, color) {
    localStorage.setItem(`buttonColor_${buttonId}`, color);
}

// Função para carregar a cor do botão do localStorage
function loadButtonColor(buttonId) {
    return localStorage.getItem(`buttonColor_${buttonId}`);
}

// Função para inicializar o Sortable em um container
function initializeSortable(container) {
    try {
        console.log('Inicializando Sortable no container:', container);
        
        // Flag para controlar se está arrastando
        let isDragging = false;
        
        // Prevenir cliques durante o arrasto
        container.addEventListener('click', function(e) {
            if (isDragging) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, true);
        
        const sortable = Sortable.create(container, {
            animation: 150,
            delay: 100,
            delayOnTouchOnly: true,
            touchStartThreshold: 5,
            handle: 'button',
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',
            forceFallback: true,
            scroll: true,
            scrollSensitivity: 80,
            scrollSpeed: 30,
            bubbleScroll: true,
            
            onStart: function(evt) {
                isDragging = true;
                const item = evt.item;
                document.body.style.cursor = 'grabbing';
                container.classList.add('drag-highlight');
                
                // Desabilitar links durante o arrasto
                const links = item.getElementsByTagName('a');
                for (let link of links) {
                    link.style.pointerEvents = 'none';
                }
            },
            
            onEnd: function(evt) {
                const item = evt.item;
                document.body.style.cursor = '';
                container.classList.remove('drag-highlight');
                
                // Reabilitar links após o arrasto
                const links = item.getElementsByTagName('a');
                for (let link of links) {
                    link.style.pointerEvents = 'auto';
                }
                
                // Salvar a nova ordem
                const buttons = Array.from(container.children);
                const order = buttons.map(btn => btn.getAttribute('data-button-id'));
                const groupId = container.closest('.group').id;
                localStorage.setItem(`buttonOrder_${groupId}`, JSON.stringify(order));
                
                // Resetar o estado de arrasto após um pequeno delay
                setTimeout(() => {
                    isDragging = false;
                }, 50);
            }
        });
        
        console.log('Sortable inicializado com sucesso');
        return sortable;
    } catch (error) {
        console.error('Erro ao inicializar Sortable:', error);
    }
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
    
    const icon = button.querySelector('i');
    if (icon) {
        icon.style.color = color.iconColor;
    }

    // Salvar a cor no localStorage
    localStorage.setItem(`buttonColor_${button.getAttribute('data-button-id')}`, colorName);
}

// Função para criar o menu de cores
function createColorMenu(button) {
    const menu = document.createElement('div');
    menu.className = 'color-menu';

    Object.keys(buttonColors).forEach(colorName => {
        const option = document.createElement('div');
        option.className = 'color-option';
        option.style.background = `linear-gradient(135deg, ${buttonColors[colorName].gradient[0]}, ${buttonColors[colorName].gradient[1]})`;
        option.onclick = () => {
            applyButtonColor(button, colorName);
            menu.remove();
        };
        menu.appendChild(option);
    });

    return menu;
}

// Inicializar personalização
function initializeCustomization() {
    console.log('Iniciando personalização...');
    
    document.querySelectorAll('.button-container button').forEach((button, index) => {
        if (!button.getAttribute('data-button-id')) {
            button.setAttribute('data-button-id', `button_${index}`);
        }
        
        // Carregar cor salva
        const savedColor = localStorage.getItem(`buttonColor_${button.getAttribute('data-button-id')}`);
        if (savedColor) {
            applyButtonColor(button, savedColor);
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

            document.addEventListener('click', function closeMenu(e) {
                if (!menu.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        });
        
        // Adicionar título para indicar que pode ser arrastado
        button.title = 'Clique e arraste para reordenar • Clique com botão direito para mudar a cor';
    });
    
    // Inicializar Sortable em cada container
    document.querySelectorAll('.button-container').forEach(container => {
        initializeSortable(container);
    });
}

// Estilos CSS
const style = document.createElement('style');
style.textContent = `
    .button-container {
        position: relative;
        min-height: 48px;
    }

    .draggable-button {
        cursor: move !important;
        user-select: none !important;
        -webkit-user-drag: none !important;
    }

    .sortable-ghost {
        opacity: 0.5 !important;
        background: rgba(96, 165, 250, 0.2) !important;
        border: 2px dashed #60A5FA !important;
    }

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
`;
document.head.appendChild(style);

// Aguardar o carregamento completo da página
window.addEventListener('load', function() {
    console.log('Página carregada, verificando Sortable.js...');
    
    if (typeof Sortable !== 'undefined') {
        console.log('Sortable.js está disponível');
        initializeCustomization();
    } else {
        console.error('Sortable.js não está disponível!');
    }
});
