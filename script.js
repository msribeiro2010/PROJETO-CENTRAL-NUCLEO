function initializeFavorites() {
    console.log('Inicializando sistema de favoritos...');
    const favoritesList = document.getElementById('favorites-list');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    // Adiciona o botão de favorito em cada botão
    document.querySelectorAll('.button-container button').forEach(button => {
        // Verifica se o botão já tem uma estrela
        const existingStar = button.querySelector('.favorite-star, .favorite-star-fill');
        if (existingStar) {
            existingStar.remove();
        }

        // Cria o botão de estrela
        const starBtn = document.createElement('i');
        starBtn.className = `bi bi-star${isFavorite(button) ? '-fill favorite-star-fill' : ' favorite-star'}`;
        
        // Configura o estilo da estrela
        Object.assign(starBtn.style, {
            position: 'absolute',
            top: '8px',
            right: '8px',
            fontSize: '1.4rem',
            cursor: 'pointer',
            zIndex: '10',
            color: isFavorite(button) ? '#fbbf24' : '#6b7280',
            opacity: isFavorite(button) ? '1' : '0.7',
            transition: 'all 0.2s ease'
        });

        starBtn.title = isFavorite(button) ? 'Remover dos favoritos' : 'Adicionar aos favoritos';

        // Adiciona evento de clique na estrela
        starBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(button);
            
            // Atualiza a aparência da estrela
            const isFav = isFavorite(button);
            starBtn.className = `bi bi-star${isFav ? '-fill favorite-star-fill' : ' favorite-star'}`;
            starBtn.style.color = isFav ? '#fbbf24' : '#6b7280';
            starBtn.style.opacity = isFav ? '1' : '0.7';
            starBtn.title = isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
        });

        // Adiciona evento de hover
        starBtn.addEventListener('mouseover', () => {
            starBtn.style.opacity = '1';
            starBtn.style.transform = 'scale(1.3)';
        });

        starBtn.addEventListener('mouseout', () => {
            if (!isFavorite(button)) {
                starBtn.style.opacity = '0.7';
            }
            starBtn.style.transform = 'scale(1)';
        });

        // Garante que o botão tenha posição relativa para o posicionamento absoluto da estrela
        button.style.position = 'relative';
        button.appendChild(starBtn);
    });

    // Renderiza a lista de favoritos
    renderFavorites();
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o relógio e data
    updateClock();
    updateDate();
    setInterval(updateClock, 1000);
    setInterval(updateDate, 60000);

    // Inicializa os acordeões
    initializeAccordions();

    // Inicializa os links da navbar
    initializeNavbarLinks();

    // Inicializa o tema
    initializeTheme();

    // Carrega os aniversariantes
    carregarAniversariantes();

    // Inicializa o modal de feriados
    const modal = document.getElementById('holiday-modal');
    if (modal) {
        // Reseta o estado do modal
        modal.style.display = 'none';
        modal.classList.remove('show');
        // Define o mês atual
        currentMonthIndex = new Date().getMonth();
    }

    // Inicializa o Sortable para os grupos
    const groupsRow = document.querySelector('.groups-row');
    if (groupsRow) {
        new Sortable(groupsRow, {
            animation: 150,
            handle: '.accordion-header',
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',
            onEnd: function(evt) {
                // Salva a nova ordem no localStorage
                const groups = Array.from(groupsRow.children).map(group => group.id);
                localStorage.setItem('groupsOrder', JSON.stringify(groups));
            }
        });

        // Restaura a ordem salva
        const savedOrder = JSON.parse(localStorage.getItem('groupsOrder') || '[]');
        if (savedOrder.length > 0) {
            const groupsArray = Array.from(groupsRow.children);
            savedOrder.forEach(id => {
                const element = groupsArray.find(el => el.id === id);
                if (element) {
                    groupsRow.appendChild(element);
                }
            });
        }
    }

    // Inicializa a busca e favoritos por último
    setTimeout(() => {
        initializeSearch();
        initializeFavorites();
        
        // Verifica se há um novo grupo de Links Rápidos para inicializar favoritos
        const linksRapidosButtons = document.querySelectorAll('#links-rapidos-content .button-container button');
        if (linksRapidosButtons.length > 0) {
            console.log('Inicializando favoritos para Links Rápidos');
            linksRapidosButtons.forEach(button => {
                // Verifica se o botão já tem uma estrela
                const existingStar = button.querySelector('.favorite-star, .favorite-star-fill');
                if (existingStar) {
                    existingStar.remove();
                }

                // Cria o botão de estrela
                const starBtn = document.createElement('i');
                starBtn.className = `bi bi-star${isFavorite(button) ? '-fill favorite-star-fill' : ' favorite-star'}`;
                
                // Configura o estilo da estrela
                Object.assign(starBtn.style, {
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    fontSize: '1.4rem',
                    cursor: 'pointer',
                    zIndex: '10',
                    color: isFavorite(button) ? '#fbbf24' : '#6b7280',
                    opacity: isFavorite(button) ? '1' : '0.7',
                    transition: 'all 0.2s ease'
                });

                starBtn.title = isFavorite(button) ? 'Remover dos favoritos' : 'Adicionar aos favoritos';

                // Adiciona evento de clique na estrela
                starBtn.addEventListener('click', (e) => {
        e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(button);
                    
                    // Atualiza a aparência da estrela
                    const isFav = isFavorite(button);
                    starBtn.className = `bi bi-star${isFav ? '-fill favorite-star-fill' : ' favorite-star'}`;
                    starBtn.style.color = isFav ? '#fbbf24' : '#6b7280';
                    starBtn.style.opacity = isFav ? '1' : '0.7';
                    starBtn.title = isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
                });

                // Adiciona evento de hover
                starBtn.addEventListener('mouseover', () => {
                    starBtn.style.opacity = '1';
                    starBtn.style.transform = 'scale(1.3)';
                });

                starBtn.addEventListener('mouseout', () => {
                    if (!isFavorite(button)) {
                        starBtn.style.opacity = '0.7';
                    }
                    starBtn.style.transform = 'scale(1)';
                });

                // Garante que o botão tenha posição relativa para o posicionamento absoluto da estrela
                button.style.position = 'relative';
                button.appendChild(starBtn);
            });
        }
        
        console.log('Sistema de busca e favoritos inicializado');
    }, 100);

    // Inicializar o relógio do Windows
    updateWindowsClock();
    
    // Atualizar o relógio a cada minuto
    setInterval(updateWindowsClock, 60000);

    // Inicializa o sistema de usuários web
    const { userId, username } = registerWebUser();
    updateActiveUsers();
    registerUserActivity();
    
    // Atualiza a lista de usuários web a cada 30 segundos
    setInterval(updateActiveUsers, 30000);
    
    console.log(`Usuário web registrado: ${username} (${userId})`);

    // Funcionalidade de toggle para o container de grupos
    const toggleButton = document.getElementById('toggle-groups');
    const groupsContainer = document.getElementById('groups-container');
    
    if (toggleButton && groupsContainer) {
        toggleButton.addEventListener('click', function() {
            const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
            
            // Atualiza o estado do botão
            toggleButton.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle da classe no container
            groupsContainer.classList.toggle('collapsed');
            
            // Salva o estado no localStorage
            localStorage.setItem('groupsContainerState', !isExpanded ? 'expanded' : 'collapsed');
        });
        
        // Restaura o estado salvo
        const savedState = localStorage.getItem('groupsContainerState');
        if (savedState === 'collapsed') {
            toggleButton.setAttribute('aria-expanded', 'false');
            groupsContainer.classList.add('collapsed');
        }
    }

    // Função para exibir uma saudação com base na hora do dia
    const greetingElement = document.getElementById('greeting-message');
    const now = new Date();
    const hours = now.getHours();
    let greeting = '';

    if (hours >= 5 && hours < 12) {
        greeting = 'Bom dia';
    } else if (hours >= 12 && hours < 18) {
        greeting = 'Boa tarde';
    } else {
        greeting = 'Boa noite';
    }

    greetingElement.textContent = `${greeting}, tenha um ótimo trabalho!`;

    // Sistema Info Tooltip
    const systemIcon = document.getElementById('system-info-icon');
    const tooltip = document.getElementById('system-info-tooltip');
    let isTooltipVisible = false;

    if (systemIcon && tooltip) {
        systemIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            isTooltipVisible = !isTooltipVisible;
            tooltip.classList.toggle('show', isTooltipVisible);
        });

        // Fechar tooltip ao clicar fora
        document.addEventListener('click', function(e) {
            if (!tooltip.contains(e.target) && !systemIcon.contains(e.target)) {
                isTooltipVisible = false;
                tooltip.classList.remove('show');
            }
        });

        // Fechar tooltip ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isTooltipVisible) {
                isTooltipVisible = false;
                tooltip.classList.remove('show');
            }
        });
    }

    // Contador de cliques para botões de atalho
    const buttons = document.querySelectorAll('.button-container button');

    buttons.forEach((btn, idx) => {
        let btnId = btn.textContent.trim() + '_' + idx;
        btnId = btnId.replace(/\s+/g, '_').replace(/[^\w\d_]/g, '');
        const counterSpan = btn.querySelector('.click-counter');
        if (!counterSpan) return;

        let count = parseInt(localStorage.getItem('btnClick_' + btnId)) || 0;
        counterSpan.textContent = count > 0 ? count : '';
        counterSpan.style.display = count > 0 ? 'flex' : 'none';
        btn.style.position = 'relative';
        if (btn.lastElementChild !== counterSpan) {
            btn.appendChild(counterSpan);
        }
        btn.addEventListener('click', function(e) {
            count = parseInt(localStorage.getItem('btnClick_' + btnId)) || 0;
            count++;
            localStorage.setItem('btnClick_' + btnId, count);
            counterSpan.textContent = count;
            counterSpan.style.display = count > 0 ? 'flex' : 'none';
            if (count > 3 && !isFavorite(btn)) {
                toggleFavorite(btn);
            }
        });
    });

    // Fecha todos os acordeões ao carregar
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.setAttribute('aria-expanded', 'false');
        const content = header.nextElementSibling;
        if (content && content.classList.contains('accordion-content')) {
            content.classList.remove('active');
            content.style.maxHeight = null;
        }
    });
});

// Funções para o modal de feriados
let currentMonthIndex = new Date().getMonth();
const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

async function showHolidays() {
    const modal = document.getElementById('holiday-modal');
    modal.style.display = 'block';
    // Força um reflow para que a transição funcione
    modal.offsetHeight;
    modal.classList.add('show');
    await loadHolidays();
}

function closeHolidayModal() {
    const modal = document.getElementById('holiday-modal');
    modal.classList.remove('show');
    // Aguarda a transição terminar antes de esconder o modal
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

async function loadHolidays() {
    const holidaysList = document.getElementById('holidays-list');
    
    try {
        // Mostra o estado de loading
        holidaysList.innerHTML = `
            <div class="loading-state">
                <i class="bi bi-arrow-repeat spin"></i>
                <p>Carregando feriados...</p>
            </div>
        `;
        
        const response = await fetch('feriados_2025.json');
        const holidays = await response.json();
        
        // Atualiza o mês atual no título
        document.getElementById('current-month').textContent = `${months[currentMonthIndex]} 2025`;
        
        // Filtra os feriados do mês atual
        const currentMonthHolidays = holidays.filter(holiday => {
            const holidayMonth = parseInt(holiday.data.split('/')[1]) - 1;
            return holidayMonth === currentMonthIndex;
        });
        
        // Renderiza os feriados
        holidaysList.innerHTML = '';
        
        if (currentMonthHolidays.length === 0) {
            holidaysList.innerHTML = '<p class="no-holidays">Não há feriados neste mês.</p>';
            return;
        }
        
        currentMonthHolidays.forEach(holiday => {
            const holidayElement = document.createElement('div');
            holidayElement.className = `holiday-item ${holiday.tipo}`;
            
            const date = holiday.data.split('/');
            const holidayDate = new Date(2025, parseInt(date[1])-1, parseInt(date[0]));
            const weekday = holidayDate.toLocaleDateString('pt-BR', { weekday: 'long' });
            
            // Calcular dias restantes
            const today = new Date();
            const diffTime = holidayDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            // Texto para exibir os dias restantes
            let daysRemainingText = '';
            let countdownClass = '';
            
            if (diffDays < 0) {
                daysRemainingText = 'Já passou';
                countdownClass = 'passed';
            } else if (diffDays === 0) {
                daysRemainingText = 'Hoje!';
                countdownClass = 'today';
            } else if (diffDays === 1) {
                daysRemainingText = 'Amanhã!';
                countdownClass = 'tomorrow';
            } else {
                daysRemainingText = `Faltam ${diffDays} dias`;
            }
            
            holidayElement.innerHTML = `
                <span class="holiday-date">${holiday.data}</span>
                <span class="holiday-weekday">${weekday}</span>
                <span class="holiday-name">${holiday.nome}</span>
                <span class="holiday-type ${holiday.tipo}">${holiday.tipo}</span>
                <span class="holiday-countdown ${countdownClass}">${daysRemainingText}</span>
            `;
            
            holidaysList.appendChild(holidayElement);
        });
        
        // Atualiza o próximo feriado
        updateNextHoliday(holidays);
        
    } catch (error) {
        console.error('Erro ao carregar feriados:', error);
        holidaysList.innerHTML = `
            <div class="error-state">
                <i class="bi bi-exclamation-circle"></i>
                <p>Erro ao carregar feriados</p>
                <button onclick="loadHolidays()" class="retry-button">
                    <i class="bi bi-arrow-clockwise"></i>
                    Tentar novamente
                </button>
            </div>
        `;
    }
}

function updateNextHoliday(holidays) {
    const today = new Date();
    const nextHolidays = holidays.filter(holiday => {
        const [day, month] = holiday.data.split('/');
        const holidayDate = new Date(2025, parseInt(month)-1, parseInt(day));
        return holidayDate >= today;
    });
    
    if (nextHolidays.length > 0) {
        const nextHoliday = nextHolidays[0];
        const [day, month] = nextHoliday.data.split('/');
        const weekday = new Date(2025, parseInt(month)-1, parseInt(day)).toLocaleDateString('pt-BR', { weekday: 'long' });
        
        document.getElementById('next-holiday').innerHTML = `
            <div class="next-holiday-content">
                <div class="next-holiday-date">
                    <i class="bi bi-calendar-heart"></i>
                    ${nextHoliday.data} (${weekday})
                </div>
                <div class="next-holiday-name">
                    ${nextHoliday.nome}
                </div>
                <div class="next-holiday-type ${nextHoliday.tipo}">
                    ${nextHoliday.tipo}
                </div>
            </div>
        `;
    } else {
        document.getElementById('next-holiday').innerHTML = '<p>Não há feriados próximos.</p>';
    }
}

function prevMonth() {
    const holidaysList = document.getElementById('holidays-list');
    holidaysList.style.opacity = '0';
    holidaysList.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        currentMonthIndex = (currentMonthIndex - 1 + 12) % 12;
        loadHolidays();
        
        setTimeout(() => {
            holidaysList.style.opacity = '1';
            holidaysList.style.transform = 'translateX(0)';
        }, 50);
    }, 300);
}

function nextMonth() {
    const holidaysList = document.getElementById('holidays-list');
    holidaysList.style.opacity = '0';
    holidaysList.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        currentMonthIndex = (currentMonthIndex + 1) % 12;
        loadHolidays();
        
        setTimeout(() => {
            holidaysList.style.opacity = '1';
            holidaysList.style.transform = 'translateX(0)';
        }, 50);
    }, 300);
}

// Event listener para fechar o modal quando clicar fora dele
document.addEventListener('click', function(event) {
    const modal = document.getElementById('holiday-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    if (event.target === modal && !modalContent.contains(event.target)) {
        closeHolidayModal();
    }
});

// Event listener para fechar o modal com a tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('holiday-modal');
        if (modal.style.display === 'block') {
            closeHolidayModal();
        }
    }
});

// Funções para o relógio e data
function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    clock.textContent = now.toLocaleTimeString('pt-BR');
}

function updateDate() {
    const now = new Date();
    const weekday = document.getElementById('weekday');
    const currentDate = document.getElementById('current-date');
    
    const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    weekday.textContent = weekdays[now.getDay()];
    currentDate.textContent = now.toLocaleDateString('pt-BR');
}

// Funções para os favoritos
function isFavorite(button) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(button.textContent.trim());
}

function toggleFavorite(button) {
    const buttonText = button.textContent.trim();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(buttonText);
    
    if (index === -1) {
        favorites.push(buttonText);
        showToast('Adicionado aos favoritos');
                } else {
        favorites.splice(index, 1);
        showToast('Removido dos favoritos');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();
}

function renderFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // Destruir instância anterior do Sortable se existir
    if (favoritesList.sortableInstance) {
        favoritesList.sortableInstance.destroy();
    }
    
    favoritesList.innerHTML = '';
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = `
            <div class="no-favorites">
                <i class="bi bi-star"></i>
                <p class="message-primary">Seus atalhos favoritos aparecerão aqui!</p>
                <p class="message-secondary">
                    Para começar, procure o ícone <span class="highlight"><i class="bi bi-star"></i> Favoritar</span> 
                    nos botões e clique para adicionar aos seus favoritos.
                </p>
                <p class="message-secondary">
                    Organize seus atalhos mais usados aqui para ter acesso rápido às suas ferramentas preferidas.
                </p>
            </div>
        `;
        return;
    }
    
    // Criar um container para os itens favoritos
    const favoritesContainer = document.createElement('div');
    favoritesContainer.className = 'favorites-items-container';
    favoritesList.appendChild(favoritesContainer);
    
    favorites.forEach(favorite => {
        const button = Array.from(document.querySelectorAll('.button-container button'))
            .find(btn => btn.textContent.trim() === favorite);
            
        if (button) {
            const favoriteItem = document.createElement('div');
            favoriteItem.className = 'favorite-item';
            favoriteItem.draggable = true;
            
            const icon = button.querySelector('i')?.className || '';
            let url = button.getAttribute('onclick')?.match(/window\.open\('([^']+)'/)?.[1] || '';
            let clickHandler;

            // Tratamento especial para o botão de Feriados
            if (favorite.includes('Feriados-2025')) {
                clickHandler = (e) => {
                    if (!e.target.closest('.remove-favorite')) {
                        showHolidays();
                    }
                };
            } else {
                clickHandler = (e) => {
                    if (!e.target.closest('.remove-favorite') && url) {
                        window.open(url, '_blank');
                    }
                };
            }
            
            favoriteItem.innerHTML = `
                <i class="${icon}"></i>
                <span>${favorite}</span>
                <button class="remove-favorite" title="Remover dos favoritos">
                    <i class="bi bi-trash"></i>
                </button>
            `;
            
            favoriteItem.onclick = (e) => {
                if (e.target.closest('.remove-favorite')) {
                    e.preventDefault();
                    e.stopPropagation();
                    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                    const index = favorites.indexOf(favorite);
                    if (index !== -1) {
                        favorites.splice(index, 1);
                        localStorage.setItem('favorites', JSON.stringify(favorites));
                        // Zera o contador de cliques do botão correspondente
                        const btnIdx = Array.from(document.querySelectorAll('.button-container button')).findIndex(btn => btn.textContent.trim() === favorite);
                        if (btnIdx !== -1) {
                            let btnId = favorite + '_' + btnIdx;
                            btnId = btnId.replace(/\s+/g, '_').replace(/[^\w\d_]/g, '');
                            localStorage.removeItem('btnClick_' + btnId);
                            // Atualiza o badge se existir
                            const btn = document.querySelectorAll('.button-container button')[btnIdx];
                            const counterSpan = btn?.querySelector('.click-counter');
                            if (counterSpan) counterSpan.textContent = '';
                        }
                        renderFavorites();
                        showToast('Removido dos favoritos');
                    }
                    return;
                }
                clickHandler(e);
            };
            
            favoritesContainer.appendChild(favoriteItem);
        }
    });
    
    // Inicializar Sortable na nova lista
    if (favorites.length > 0) {
        favoritesList.sortableInstance = new Sortable(favoritesContainer, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',
            handle: '.favorite-item',
            onEnd: function(evt) {
                const newOrder = Array.from(favoritesContainer.querySelectorAll('.favorite-item span'))
                    .map(span => span.textContent.trim());
                
                if (newOrder.length > 0) {
                    localStorage.setItem('favorites', JSON.stringify(newOrder));
                    showToast('Ordem dos favoritos atualizada');
                }
            }
        });
    }
}

// Funções para os accordions
function initializeAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            
            // Toggle aria-expanded
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle content display
            content.style.display = isExpanded ? 'none' : 'block';
            
            // Rotate icon
            icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });
}

// Funções para a navegação
function initializeNavbarLinks() {
    document.querySelectorAll('.navbar-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // Expande o accordion se estiver fechado
                const header = targetElement.querySelector('.accordion-header');
                const content = targetElement.querySelector('.accordion-content');
                if (header && content && content.style.display !== 'block') {
                    header.click();
                }
            }
        });
    });
}

// Funções para o tema
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const isDark = localStorage.getItem('darkMode') === 'true';
    
    if (isDark) {
        document.body.classList.add('dark');
        themeIcon.className = 'bi bi-sun-fill';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDarkMode = document.body.classList.contains('dark');
        localStorage.setItem('darkMode', isDarkMode);
        themeIcon.className = isDarkMode ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    });
}

// Funções para a busca
function initializeSearch() {
    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');
    let searchIndex = [];
    
    // Cria o índice de busca
    document.querySelectorAll('.button-container button').forEach(button => {
        const text = button.textContent.trim();
        const url = button.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] || '';
        const icon = button.querySelector('i')?.className || '';
        
        searchIndex.push({
            text,
            url,
            icon,
            element: button,
            searchTerms: `${text.toLowerCase()} ${url.toLowerCase()}`
    });
});

    // Eventos do input de busca
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        const results = searchIndex.filter(item => 
            item.searchTerms.includes(query)
        ).slice(0, 5);
        
        searchResults.innerHTML = '';
        
        if (results.length > 0) {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <i class="${result.icon}"></i>
                    <span>${result.text}</span>
                    ${result.url ? `<span class="search-result-url">${result.url}</span>` : ''}
                `;
                resultItem.addEventListener('click', () => {
                    result.element.click();
                    searchInput.value = '';
                    searchResults.style.display = 'none';
                });
                searchResults.appendChild(resultItem);
            });
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    });
    
    // Fecha os resultados ao clicar fora
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
    
    // Navegação com teclado
    searchInput.addEventListener('keydown', (e) => {
        const results = searchResults.querySelectorAll('.search-result-item');
        const current = searchResults.querySelector('.search-result-item:hover');
        let next;
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (!current) {
                    next = results[0];
                } else {
                    const index = Array.from(results).indexOf(current);
                    next = results[index + 1] || results[0];
                }
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                if (!current) {
                    next = results[results.length - 1];
                } else {
                    const index = Array.from(results).indexOf(current);
                    next = results[index - 1] || results[results.length - 1];
                }
                break;
                
            case 'Enter':
                if (current) {
                    e.preventDefault();
                    current.click();
                }
                break;
                
            case 'Escape':
                searchResults.style.display = 'none';
                searchInput.blur();
                break;
        }
        
        if (next) {
            current?.classList.remove('hover');
            next.classList.add('hover');
            next.scrollIntoView({ block: 'nearest' });
        }
    });
}

// Função para mostrar toast
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Função para carregar aniversariantes
async function carregarAniversariantes() {
    try {
        // Dados de fallback para caso o fetch falhe (importante para protocolo file://)
        const dadosFallback = {
            "Servidores": [
                { "nome": "Marta", "data": "28/02" },
                { "nome": "Caetano", "data": "26/03" },
                { "nome": "Silvio", "data": "26/03" },
                { "nome": "Natália", "data": "31/03" },
                { "nome": "Wagner", "data": "07/04" },
                { "nome": "Lloyd", "data": "12/04" },
                { "nome": "Thaís", "data": "11/05" },
                { "nome": "Nathany", "data": "23/09" },
                { "nome": "Tatiana", "data": "28/09" },
                { "nome": "Marcelo", "data": "29/12" }
            ]
        };
        
        let data;
        
        // Verifica se estamos usando o protocolo file://
        if (window.location.protocol === 'file:') {
            console.log('Usando protocolo file://, carregando dados embutidos');
            data = dadosFallback;
        } else {
            // Tenta carregar do arquivo JSON
            try {
                const response = await fetch('aniversariantes.json');
                if (!response.ok) {
                    throw new Error('Falha ao carregar o arquivo de aniversariantes');
                }
                
                data = await response.json();
                if (!data || !Array.isArray(data.Servidores)) {
                    throw new Error('Formato de dados inválido');
                }
            } catch (fetchError) {
                console.warn('Erro ao carregar JSON, usando dados de fallback:', fetchError);
                data = dadosFallback;
            }
        }

        const hoje = new Date();
        const mesAtual = hoje.getMonth() + 1;
        const diaAtual = hoje.getDate();
        
        console.log('Data atual:', diaAtual, '/', mesAtual, '/', hoje.getFullYear());
        
        // Filtra aniversariantes do mês atual
        console.log('Aniversariantes no arquivo:', data.Servidores);
        
        const aniversariantesMes = data.Servidores.filter(aniversariante => {
            try {
                const [dia, mes] = (aniversariante.data || '').split('/');
                const isThisMonth = parseInt(mes) === mesAtual;
                if (isThisMonth) {
                    console.log(`Aniversariante do mês atual: ${aniversariante.nome} - ${aniversariante.data}`);
                    const isToday = parseInt(dia) === diaAtual;
                    if (isToday) {
                        console.log(`*** ANIVERSARIANTE DE HOJE: ${aniversariante.nome} - ${aniversariante.data} ***`);
                    }
                }
                return isThisMonth;
            } catch (e) {
                console.error('Erro ao processar data:', aniversariante);
                return false;
            }
        });
        
        // Ordena por dia
        aniversariantesMes.sort((a, b) => {
            const diaA = parseInt(a.data.split('/')[0]);
            const diaB = parseInt(b.data.split('/')[0]);
            return diaA - diaB;
        });
        
        const lista = document.getElementById('aniversariantes-lista');
        if (!lista) {
            throw new Error('Elemento da lista não encontrado');
        }
        
        if (aniversariantesMes.length === 0) {
            lista.innerHTML = `
                <div class="sem-aniversariantes">
                    <i class="bi bi-emoji-smile"></i>
                    <p>Não há aniversariantes neste mês</p>
                </div>
            `;
            return;
        }
        
        lista.innerHTML = '';
        
        aniversariantesMes.forEach((aniversariante, index) => {
            if (!aniversariante.data || !aniversariante.nome) {
                console.error('Dados de aniversariante inválidos:', aniversariante);
                return;
            }

            const [dia] = aniversariante.data.split('/');
            const isToday = parseInt(dia) === diaAtual;
            
            const aniversarianteElement = document.createElement('div');
            aniversarianteElement.className = `aniversariante-item${isToday ? ' hoje' : ''}`;
            aniversarianteElement.style.animationDelay = `${index * 0.1}s`;
            
            // Adiciona elementos de decoração para aniversariantes do dia, mas sem o brilho automático
            if (isToday) {
                // Adicionamos apenas os sparkles, mas sem a classe aniversariante-brilho
                // para evitar a animação automática
                for (let i = 0; i < 5; i++) {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'sparkle';
                    sparkle.style.left = `${Math.random() * 100}%`;
                    sparkle.style.top = `${Math.random() * 100}%`;
                    sparkle.style.animationDelay = `${Math.random() * 2}s`;
                    aniversarianteElement.appendChild(sparkle);
                }
            }
            
            const mensagemParabens = isToday ? `
                <div class="mensagem-parabens">
                    <div class="parabens-header">
                        <i class="bi bi-stars"></i>
                        <span>🎉 Feliz Aniversário! 🎉</span>
                        <i class="bi bi-stars"></i>
                    </div>
                    <p class="parabens-texto">
                        Hoje é um dia muito especial! Que seja repleto de alegria, 
                        sorrisos e momentos inesquecíveis. Desejamos a você um ano 
                        cheio de conquistas e realizações! 🌟
                    </p>
                    <div class="parabens-icons">
                        <i class="bi bi-balloon-heart-fill"></i>
                        <i class="bi bi-cake2-fill"></i>
                        <i class="bi bi-gift-fill"></i>
                        <i class="bi bi-stars"></i>
                        <i class="bi bi-emoji-laughing-fill"></i>
                    </div>
                </div>
            ` : '';
            
            aniversarianteElement.innerHTML = `
                <div class="aniversariante-content">
                    <div class="aniversariante-icon">
                        <i class="bi bi-gift${isToday ? '-fill animated pulse' : ''}"></i>
                    </div>
                    <div class="aniversariante-info">
                        <div class="aniversariante-data">
                            <i class="bi bi-calendar-event"></i>
                            ${aniversariante.data}
                        </div>
                        <div class="aniversariante-nome aniversariante-nome-clicavel">
                            ${aniversariante.nome}
                            ${isToday ? '<span class="badge-hoje">🎂 Hoje!</span>' : ''}
                        </div>
                    </div>
                    ${isToday ? `
                        <div class="icone-festivo">🎈</div>
                        <div class="icone-festivo">🎁</div>
                        <div class="icone-festivo">🎊</div>
                        <div class="icone-festivo">✨</div>
                    ` : ''}
                </div>
                ${mensagemParabens}
            `;
            
            // Adiciona evento de clique no nome
            const nomeElement = aniversarianteElement.querySelector('.aniversariante-nome');
            nomeElement.addEventListener('click', () => {
                // Remove a classe de todos os outros itens
                document.querySelectorAll('.aniversariante-clicado').forEach(item => {
                    if (item !== aniversarianteElement) {
                        item.classList.remove('aniversariante-clicado');
                    }
                });
                
                // Adiciona a classe ao item clicado
                aniversarianteElement.classList.add('aniversariante-clicado');
                
                // Garante que a mensagem de parabéns esteja visível
                const mensagemParabens = aniversarianteElement.querySelector('.mensagem-parabens');
                if (mensagemParabens) {
                    mensagemParabens.style.display = 'block';
                }
                
                // Mostra a mensagem de aniversário
                showBirthdayMessage(aniversariante.nome, isToday);
                
                // Não remove automaticamente a classe - será removida ao clicar em outro lugar
            });
            
            if (isToday) {
                // Adiciona confetti ao passar o mouse
                aniversarianteElement.addEventListener('mouseenter', () => {
                    confetti({
                        particleCount: 50,
                        spread: 60,
                        origin: { y: 0.8 },
                        colors: ['#ff6b6b', '#ffd93d', '#6c5ce7', '#a8e6cf', '#ff8787']
                    });
                });
                
                // Dispara confetti imediatamente quando o card é criado
                setTimeout(() => {
                    confetti({
                        particleCount: 30,
                        spread: 50,
                        origin: { y: 0.8 },
                        colors: ['#ff6b6b', '#ffd93d', '#6c5ce7', '#a8e6cf', '#ff8787']
                    });
                }, index * 100 + 500);
            }
            
            lista.appendChild(aniversarianteElement);
            
            // Se for aniversariante de hoje, destaca automaticamente
            if (isToday) {
                console.log(`Destacando aniversariante de hoje: ${aniversariante.nome}`);
                // Adiciona a classe para destacar o aniversariante de hoje
                aniversarianteElement.classList.add('aniversariante-hoje');
            }
        });
        
        // Verifica se há aniversariantes hoje e exibe uma mensagem se houver
        const aniversariantesHoje = aniversariantesMes.filter(aniv => {
            const [dia] = aniv.data.split('/');
            return parseInt(dia) === diaAtual;
        });
        
        if (aniversariantesHoje.length > 0) {
            console.log(`Hoje é aniversário de: ${aniversariantesHoje.map(a => a.nome).join(', ')}`);
        }
    } catch (error) {
        console.error('Erro ao carregar aniversariantes:', error);
        document.getElementById('aniversariantes-lista').innerHTML = `
            <div class="sem-aniversariantes">
                <i class="bi bi-emoji-frown"></i>
                <p>Erro ao carregar aniversariantes</p>
            </div>
        `;
    }
}

// Função para mostrar o modal de aniversário
function showBirthdayModal(nome) {
    const modal = document.getElementById('birthday-modal');
    const message = document.getElementById('birthday-message');
    
    message.innerHTML = `
        <p>Hoje é o aniversário de</p>
        <h3>${nome}</h3>
        <p>🎉 Parabéns! 🎉</p>
    `;
    
    modal.style.display = 'block';
    
    // Adiciona confete
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function closeBirthdayModal() {
    const modal = document.getElementById('birthday-modal');
    modal.style.display = 'none';
}

function exibirAniversariantes(aniversariantes) {
    const lista = document.getElementById('aniversariantes-lista');
    lista.innerHTML = '';

    if (aniversariantes.length === 0) {
        lista.innerHTML = '<div class="sem-aniversariantes">Nenhum aniversariante este mês</div>';
        return;
    }

    aniversariantes.forEach(aniversariante => {
        const item = document.createElement('div');
        item.className = 'aniversariante-item';
        
        const icon = document.createElement('div');
        icon.className = 'aniversariante-icon';
        icon.innerHTML = '<i class="bi bi-gift"></i>';
        
        const info = document.createElement('div');
        info.className = 'aniversariante-info';
        
        const nome = document.createElement('div');
        nome.className = 'aniversariante-nome';
        nome.textContent = aniversariante.Servidores;
        
        const data = document.createElement('div');
        data.className = 'aniversariante-data';
        data.textContent = aniversariante.data;
        
        info.appendChild(nome);
        info.appendChild(data);
        
        item.appendChild(icon);
        item.appendChild(info);
        
        lista.appendChild(item);
    });
}

// Função para atualizar o relógio e data no footer (estilo Windows)
function updateWindowsClock() {
    const now = new Date();
    
    // Formatar hora (formato 24h) - HH:MM
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    // Atualizar o relógio
    const footerClock = document.getElementById('footer-clock');
    if (footerClock) {
        footerClock.textContent = timeString;
    }
    
    // Formatar data - DD/MM/YYYY (estilo Windows)
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const dateString = `${day}/${month}/${year}`;
    
    // Atualizar a data
    const footerDate = document.getElementById('footer-date');
    if (footerDate) {
        footerDate.textContent = dateString;
    }
}

function createFavoriteItem(text, url) {
    const item = document.createElement('div');
    item.className = 'favorite-item';
    item.setAttribute('data-url', url);

    const icon = document.createElement('i');
    icon.className = 'bi bi-link-45deg';
    
    const span = document.createElement('span');
    span.textContent = text;
    
    const removeButton = document.createElement('div');
    removeButton.className = 'remove-favorite';
    removeButton.innerHTML = '<i class="bi bi-trash3-fill"></i>';
    removeButton.onclick = function(e) {
        e.stopPropagation();
        removeFavorite(text);
    };

    item.appendChild(icon);
    item.appendChild(span);
    item.appendChild(removeButton);
    
    return item;
}

function canBeRemoved(text) {
    const removableItems = [
        'SecJud',
        'Feriados-2025',
        'Controle/Trabalho',
        'Controle/trabalho',
        'Controle trabalho',
        'Controle/Trabalho'
    ];
    return removableItems.some(item => text.trim().includes(item));
}

function checkEmptyFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    const noFavoritesMessage = document.getElementById('no-favorites');
    
    if (favoritesList.children.length === 1 && favoritesList.children[0].id === 'no-favorites') {
        noFavoritesMessage.style.display = 'flex';
    } else {
        noFavoritesMessage.style.display = 'none';
    }
}

function showBirthdayMessage(nome, isToday) {
    // Não cria mais mensagem externa nem reproduz som
    // Apenas mostra o confete e destaca o card do aniversariante
    
    if (isToday) {
        // Apenas mostra o confete
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffc107', '#ff6b6b', '#4dabf7', '#51cf66', '#be4bdb']
        });
        
        console.log('Mostrando mensagem de aniversário no card para:', nome);
    } else {
        // Para aniversariantes futuros, não faz nada especial
        console.log('Aniversariante futuro:', nome);
    }
    
    // Não cria nem adiciona mensagem externa ao corpo do documento
}

// Função para gerar um ID único para o usuário
function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

// Função para registrar usuário web
function registerWebUser() {
    const userId = localStorage.getItem('userId') || generateUserId();
    let username = localStorage.getItem('username');
    
    // Se não houver um nome de usuário salvo, usa o nome do usuário da máquina
    if (!username) {
        // Tenta obter o nome do usuário da máquina
        fetch('/api/username')
            .then(response => response.text())
            .then(machineUsername => {
                username = machineUsername || `Usuário ${userId.slice(5, 9)}`;
                localStorage.setItem('username', username);
                
                // Registra o usuário na lista de usuários ativos
                const activeUsers = JSON.parse(localStorage.getItem('activeUsers') || '{}');
                activeUsers[userId] = {
                    username: username,
                    lastActive: Date.now()
                };
                localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
            })
            .catch(error => {
                console.error('Erro ao obter nome do usuário:', error);
                username = `Usuário ${userId.slice(5, 9)}`;
                localStorage.setItem('username', username);
                
                // Registra o usuário na lista de usuários ativos mesmo com erro
                const activeUsers = JSON.parse(localStorage.getItem('activeUsers') || '{}');
                activeUsers[userId] = {
                    username: username,
                    lastActive: Date.now()
                };
                localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
            });
    } else {
        // Se já tem username, apenas atualiza os usuários ativos
        const activeUsers = JSON.parse(localStorage.getItem('activeUsers') || '{}');
        activeUsers[userId] = {
            username: username,
            lastActive: Date.now()
        };
        localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
    }
    
    localStorage.setItem('userId', userId);
    localStorage.setItem('lastActive', Date.now());
    
    return { userId, username };
}

// Função para atualizar usuários ativos
function updateActiveUsers() {
    const now = Date.now();
    const activeUsers = JSON.parse(localStorage.getItem('activeUsers') || '{}');
    const currentUser = localStorage.getItem('userId');
    
    // Remove usuários inativos (5 minutos sem atividade)
    Object.keys(activeUsers).forEach(userId => {
        if (now - activeUsers[userId].lastActive > 5 * 60 * 1000) {
            delete activeUsers[userId];
        }
    });
    
    // Atualiza timestamp do usuário atual
    if (activeUsers[currentUser]) {
        activeUsers[currentUser].lastActive = now;
    }
    
    localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
    displayWebUsers(activeUsers);
}

// Função para exibir usuários web
function displayWebUsers(activeUsers) {
    const webUsersList = document.getElementById('web-users-list');
    if (!webUsersList) return;
    
    const users = Object.entries(activeUsers);
    
    if (users.length === 0) {
        webUsersList.innerHTML = `
            <div class="web-users-loading">
                <i class="bi bi-people"></i>
                <span>Nenhum usuário online</span>
            </div>
        `;
        return;
    }
    
    webUsersList.innerHTML = '';
    users.forEach(([userId, user]) => {
        const userElement = document.createElement('div');
        userElement.className = 'web-user';
        userElement.innerHTML = `
            <i class="bi bi-person-circle"></i>
            <span>${user.username}</span>
            <span class="user-status"></span>
        `;
        webUsersList.appendChild(userElement);
    });
    
    // Atualiza o contador de usuários
    const userCount = users.length;
    const title = document.querySelector('.github-users-title span');
    if (title) {
        title.textContent = `Usuários Online (${userCount})`;
    }
}

// Registra eventos de atividade do usuário
function registerUserActivity() {
    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach(event => {
        document.addEventListener(event, () => {
            const activeUsers = JSON.parse(localStorage.getItem('activeUsers') || '{}');
            const userId = localStorage.getItem('userId');
            if (activeUsers[userId]) {
                activeUsers[userId].lastActive = Date.now();
                localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
            }
        });
    });
}
