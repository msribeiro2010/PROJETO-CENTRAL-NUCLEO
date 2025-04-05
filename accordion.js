/**
 * Accordion Manager
 * Este script gerencia os accordions de forma independente
 */

document.addEventListener('DOMContentLoaded', function() {
    // Esperar um pouco para garantir que outros scripts foram carregados
    setTimeout(() => {
        console.log('Inicializando sistema de accordions...');
        initAccordions();
        
        // Adicionar listener para garantir que cliques em botões não fechem o accordion
        document.querySelectorAll('.accordion-content button').forEach(button => {
            button.addEventListener('click', e => e.stopPropagation());
        });
        
        // Evitar que cliques dentro do accordion content propaguem e fechem o accordion
        document.querySelectorAll('.accordion-content').forEach(content => {
            content.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });

        // Verificar se há um novo accordion para inicializar
        const linksRapidosAccordion = document.querySelector('#links-rapidos .accordion-header');
        if (linksRapidosAccordion) {
            console.log('Inicializando accordion de Links Rápidos');
            // Garantir que tenha o listener correto
            linksRapidosAccordion.addEventListener('click', function(e) {
                e.stopPropagation(); 
                e.preventDefault();
                
                // Verificar se o click foi no header e não em um elemento interno
                if (e.target.closest('.accordion-header') === this) {
                    handleAccordionClick.call(this, e);
                }
            });
        }
    }, 100);
});

/**
 * Inicializa todos os accordions na página
 */
function initAccordions() {
    console.log('Iniciando gerenciamento de accordions');
    
    // Primeiro, fechar todos os accordions
    closeAllAccordions();
    
    // Remover listeners existentes
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        // Clonar e substituir para remover listeners antigos
        const newHeader = header.cloneNode(true);
        header.parentNode.replaceChild(newHeader, header);
    });
    
    // Adicionar novos listeners otimizados
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            // Verificar se o click foi no header e não em um elemento interno
            if (e.target.closest('.accordion-header') === this) {
                handleAccordionClick.call(this, e);
            }
        });
    });
}

/**
 * Fecha todos os accordions na página
 */
function closeAllAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        const content = header.nextElementSibling;
        header.setAttribute('aria-expanded', 'false');
        
        const icon = header.querySelector('.accordion-icon');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
        
        if (content && content.classList.contains('accordion-content')) {
            content.style.maxHeight = null;
            content.classList.remove('active');
        }
    });
}

/**
 * Gerencia o clique em um accordion
 * @param {Event} e - Evento de clique
 */
function handleAccordionClick(e) {
    // Obter o grupo atual (pai do accordion)
    const currentGroup = this.closest('.group');
    const header = this;
    const content = header.nextElementSibling;
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    
    // Fechar todos os accordions no mesmo grupo
    if (currentGroup) {
        currentGroup.querySelectorAll('.accordion-header').forEach(groupHeader => {
            if (groupHeader !== header) {
                const groupContent = groupHeader.nextElementSibling;
                groupHeader.setAttribute('aria-expanded', 'false');
                
                const icon = groupHeader.querySelector('.accordion-icon');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
                
                if (groupContent && groupContent.classList.contains('accordion-content')) {
                    groupContent.style.maxHeight = null;
                    groupContent.classList.remove('active');
                }
            }
        });
    } else {
        // Se não estiver em um grupo, fechar todos os outros accordions
        document.querySelectorAll('.accordion-header').forEach(otherHeader => {
            if (otherHeader !== header) {
                const otherContent = otherHeader.nextElementSibling;
                otherHeader.setAttribute('aria-expanded', 'false');
                
                const icon = otherHeader.querySelector('.accordion-icon');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
                
                if (otherContent && otherContent.classList.contains('accordion-content')) {
                    otherContent.style.maxHeight = null;
                    otherContent.classList.remove('active');
                }
            }
        });
    }
    
    // Alternar estado do accordion atual
    header.setAttribute('aria-expanded', !isExpanded);
    
    // Alternar ícone
    const icon = header.querySelector('.accordion-icon');
    if (icon) {
        icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
    }
    
    // Alternar conteúdo
    if (content && content.classList.contains('accordion-content')) {
        if (isExpanded) {
            // Fechar
            content.style.maxHeight = null;
            setTimeout(() => {
                content.classList.remove('active');
            }, 10);
        } else {
            // Abrir
            content.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
            
            // Rolar para mostrar o accordion se necessário
            setTimeout(() => {
                const headerRect = header.getBoundingClientRect();
                if (headerRect.top < 0) {
                    window.scrollTo({
                        top: window.pageYOffset + headerRect.top - 20,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        }
    }
} 