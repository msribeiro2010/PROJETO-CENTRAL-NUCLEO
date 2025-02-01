// Cores disponíveis para personalização
const buttonColors = {
    blue: {
        name: 'Azul',
        gradient: ['#60A5FA', '#3B82F6'],
        hoverGradient: ['#3B82F6', '#2563EB']
    },
    green: {
        name: 'Verde',
        gradient: ['#34D399', '#059669'],
        hoverGradient: ['#059669', '#047857']
    },
    red: {
        name: 'Vermelho',
        gradient: ['#F87171', '#DC2626'],
        hoverGradient: ['#DC2626', '#B91C1C']
    },
    purple: {
        name: 'Roxo',
        gradient: ['#A78BFA', '#7C3AED'],
        hoverGradient: ['#7C3AED', '#6D28D9']
    },
    orange: {
        name: 'Laranja',
        gradient: ['#FB923C', '#EA580C'],
        hoverGradient: ['#EA580C', '#C2410C']
    },
    pink: {
        name: 'Rosa',
        gradient: ['#F472B6', '#DB2777'],
        hoverGradient: ['#DB2777', '#BE185D']
    }
};

// Cores padrão para cada grupo
const defaultColors = {
    'google-apps': {
        default: ['#4285F4', '#0F9D58'],
        hover: ['#357ABD', '#0B7B44']
    },
    'assyst-pje': {
        default: ['#60A5FA', '#3B82F6'],
        hover: ['#3B82F6', '#2563EB']
    }
};

// Função para aplicar cor ao botão
function applyButtonColor(button, colorName) {
    let gradient, hoverGradient;
    
    if (colorName === 'default') {
        const groupId = button.closest('.group').id;
        const defaultColor = defaultColors[groupId];
        if (defaultColor) {
            gradient = defaultColor.default;
            hoverGradient = defaultColor.hover;
        }
    } else {
        const color = buttonColors[colorName];
        if (color) {
            gradient = color.gradient;
            hoverGradient = color.hoverGradient;
        }
    }
    
    if (gradient && hoverGradient) {
        button.style.setProperty('--button-gradient', `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`);
        button.style.setProperty('--button-hover-gradient', `linear-gradient(135deg, ${hoverGradient[0]}, ${hoverGradient[1]})`);
        
        // Salvar a cor no localStorage apenas se não for a cor padrão
        if (colorName !== 'default') {
            localStorage.setItem(`buttonColor_${button.getAttribute('data-button-id')}`, colorName);
        }
    }
}

// Função para criar o menu de cores
function createColorMenu(button) {
    const menu = document.createElement('div');
    menu.className = 'color-menu';
    menu.style.cssText = `
        position: absolute;
        background: white;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        padding: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        z-index: 1000;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4px;
    `;
    
    // Adicionar opção padrão
    const defaultOption = document.createElement('button');
    defaultOption.innerHTML = 'Padrão';
    defaultOption.style.cssText = `
        padding: 8px;
        border: 1px solid #E5E7EB;
        border-radius: 4px;
        background: white;
        cursor: pointer;
        font-size: 12px;
        grid-column: span 3;
        margin-bottom: 4px;
    `;
    defaultOption.onclick = (e) => {
        e.preventDefault();
        applyButtonColor(button, 'default');
        menu.remove();
    };
    menu.appendChild(defaultOption);
    
    // Adicionar todas as cores disponíveis
    Object.entries(buttonColors).forEach(([key, color]) => {
        const colorButton = document.createElement('button');
        colorButton.style.cssText = `
            width: 32px;
            height: 32px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            background: linear-gradient(135deg, ${color.gradient[0]}, ${color.gradient[1]});
        `;
        colorButton.title = color.name;
        colorButton.onclick = (e) => {
            e.preventDefault();
            applyButtonColor(button, key);
            menu.remove();
        };
        menu.appendChild(colorButton);
    });
    
    return menu;
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

// Inicializar personalização
function initializeCustomization() {
    console.log('Iniciando personalização...');
    
    document.querySelectorAll('.button-container button').forEach((button, index) => {
        if (!button.getAttribute('data-button-id')) {
            button.setAttribute('data-button-id', `button_${index}`);
        }
        
        // Carregar cor salva ou usar cor padrão
        const buttonId = button.getAttribute('data-button-id');
        const savedColor = localStorage.getItem(`buttonColor_${buttonId}`);
        
        if (savedColor && buttonColors[savedColor]) {
            applyButtonColor(button, savedColor);
        } else {
            applyButtonColor(button, 'default');
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
