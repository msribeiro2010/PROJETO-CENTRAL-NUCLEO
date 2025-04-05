<<<<<<< HEAD
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
            top: '5px',
            right: '5px',
            fontSize: '1rem',
            cursor: 'pointer',
            zIndex: '10',
            color: isFavorite(button) ? '#fbbf24' : '#6b7280',
            opacity: isFavorite(button) ? '1' : '0.5',
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
            starBtn.style.opacity = isFav ? '1' : '0.5';
            starBtn.title = isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
        });

        // Adiciona evento de hover
        starBtn.addEventListener('mouseover', () => {
            starBtn.style.opacity = '1';
            starBtn.style.transform = 'scale(1.2)';
        });

        starBtn.addEventListener('mouseout', () => {
            if (!isFavorite(button)) {
                starBtn.style.opacity = '0.5';
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
        console.log('Sistema de busca e favoritos inicializado');
    }, 100);
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
    
    // Definir quais favoritos são fixos (sem lixeira e não removíveis)
    const fixedFavorites = ['Feriados 2025', 'Controle/Trabalho'];
    
    // Estilizar o container de favoritos para exibição horizontal
    favoritesList.style.display = 'flex';
    favoritesList.style.flexDirection = 'row';
    favoritesList.style.flexWrap = 'wrap';
    favoritesList.style.gap = '8px';
    favoritesList.style.padding = '10px';
    
    favoritesList.innerHTML = '';
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = `
            <div class="no-favorites" style="width: 100%; text-align: center;">
                <i class="bi bi-star"></i>
                <p>Nenhum favorito adicionado</p>
            </div>
        `;
        return;
    }
    
    // Ordenar os favoritos para que os fixos apareçam primeiro
    const fixedFavoritesInList = fixedFavorites.filter(fav => favorites.includes(fav));
    const otherFavorites = favorites.filter(fav => !fixedFavorites.includes(fav));
    const finalFavorites = [...fixedFavoritesInList, ...otherFavorites];
    
    finalFavorites.forEach(favorite => {
        const button = Array.from(document.querySelectorAll('.button-container button'))
            .find(btn => btn.textContent.trim() === favorite);
            
        if (button) {
            const favoriteItem = document.createElement('div');
            favoriteItem.className = 'favorite-item-container';
            favoriteItem.style.position = 'relative';
            favoriteItem.style.display = 'inline-block';
            favoriteItem.style.width = 'auto';
            favoriteItem.style.margin = '4px';
            
            const favoriteButton = document.createElement('button');
            favoriteButton.className = 'favorite-item';
            favoriteButton.style.position = 'relative'; // Importante para posicionamento da lixeira
            favoriteButton.style.whiteSpace = 'nowrap';
            favoriteButton.style.padding = '8px 12px';
            favoriteButton.style.borderRadius = '6px';
            favoriteButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            favoriteButton.style.border = '1px solid #e2e8f0';
            favoriteButton.style.cursor = 'pointer';
            favoriteButton.style.transition = 'all 0.2s ease';
            
            // Adicionar lixeira apenas se não for um favorito fixo
            const isFixedFavorite = fixedFavorites.includes(favorite);
            if (!isFixedFavorite) {
                favoriteButton.innerHTML = `
                    <i class="${button.querySelector('i').className}"></i>
                    <span>${favorite}</span>
                    <i class="bi bi-trash favorite-trash-icon" style="font-size:0.9rem;margin-left:8px;color:#e53e3e;opacity:0;transition:all 0.2s ease;cursor:pointer;"></i>
                `;
                
                // Adicionar evento de hover para a lixeira
                favoriteButton.addEventListener('mouseenter', () => {
                    const trashIcon = favoriteButton.querySelector('.favorite-trash-icon');
                    if (trashIcon) {
                        trashIcon.style.opacity = '1';
                    }
                });
                
                favoriteButton.addEventListener('mouseleave', () => {
                    const trashIcon = favoriteButton.querySelector('.favorite-trash-icon');
                    if (trashIcon) {
                        trashIcon.style.opacity = '0';
                    }
                });
                
                // Adicionar evento de clique na lixeira
                favoriteButton.querySelector('.favorite-trash-icon').addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Remover dos favoritos
                    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                    const index = favorites.indexOf(favorite);
                    if (index !== -1) {
                        favorites.splice(index, 1);
                        localStorage.setItem('favorites', JSON.stringify(favorites));
                        
                        // Atualizar a estrela no botão original
                        const originalButton = Array.from(document.querySelectorAll('.button-container button'))
                            .find(btn => btn.textContent.trim() === favorite);
                            
                        if (originalButton) {
                            // Atualizar a estrela no botão original
                            const starIcon = originalButton.querySelector('.bi-star-fill');
                            if (starIcon) {
                                starIcon.className = 'bi bi-star favorite-star';
                                starIcon.style.color = 'white'; // Mudar para branca
                                starIcon.style.opacity = '0.5';
                                starIcon.title = 'Adicionar aos favoritos';
                            }
                            
                            // Atualizar a estrela no container (se existir)
                            const starContainer = originalButton.parentNode.querySelector('.star-container');
                            if (starContainer) {
                                const containerStarIcon = starContainer.querySelector('i');
                                if (containerStarIcon) {
                                    containerStarIcon.className = 'bi bi-star favorite-star';
                                    containerStarIcon.style.color = 'white'; // Mudar para branca
                                    containerStarIcon.style.opacity = '0.5';
                                    containerStarIcon.title = 'Adicionar aos favoritos';
                                }
                            }
                            
                            // Remover a lixeira se existir
                            const trashContainer = originalButton.parentNode.querySelector('.trash-container');
                            if (trashContainer) {
                                trashContainer.remove();
                            }
                        }
                        
                        // Renderizar novamente os favoritos
                        renderFavorites();
                        
                        // Mostrar mensagem
                        showToast('Removido dos favoritos');
                    }
                });
            } else {
                // Para favoritos fixos, sem lixeira
                favoriteButton.innerHTML = `
                    <i class="${button.querySelector('i').className}"></i>
                    <span>${favorite}</span>
                `;
            }
            
            favoriteButton.onclick = (e) => {
                // Se o clique for na lixeira, não abrir o link
                if (e.target.classList.contains('favorite-trash-icon')) {
                    return;
                }
                button.click();
            };
            
            favoriteItem.appendChild(favoriteButton);
            
            // A lixeira agora está dentro do botão, não precisamos adicionar separadamente
            
            favoritesList.appendChild(favoriteItem);
        }
    });
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
        const response = await fetch('aniversariantes.json');
        const aniversariantes = await response.json();
        
        const hoje = new Date();
        const mesAtual = hoje.getMonth() + 1;
        const diaAtual = hoje.getDate();
        
        // Filtra aniversariantes do mês atual
        const aniversariantesMes = aniversariantes.filter(aniversariante => {
            const [dia, mes] = aniversariante.data.split('/');
            return parseInt(mes) === mesAtual;
        });
        
        // Ordena por dia
=======
// Função para atualizar o relógio
function updateClock() {
    const now = new Date();
    const options = { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    };
    document.getElementById('clock').textContent = now.toLocaleTimeString('pt-BR', options);
}

// Função para atualizar a data e dia da semana
function updateDate() {
    const now = new Date();
    const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    const weekday = weekdays[now.getDay()];
    const day = now.getDate().toString().padStart(2, '0');
    const date = `${day} de ${months[now.getMonth()]} de ${now.getFullYear()}`;
    
    document.getElementById('weekday').textContent = weekday;
    document.getElementById('current-date').textContent = date;
    
    // Atualizar classe para dia útil/fim de semana
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    document.querySelector('.calendar-wrapper').classList.toggle('weekend', isWeekend);
}

// Atualizar o relógio a cada minuto
setInterval(updateClock, 60000);
updateClock(); // Chamada inicial

// Atualizar a data a cada minuto
setInterval(updateDate, 60000);
updateDate(); // Chamada inicial

// Alternância de tema claro/escuro
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function setTheme(isDark) {
    // Aplica a classe 'dark' tanto ao body quanto ao html
    document.body.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('dark', isDark);
    
    // Atualiza o ícone
    themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    
    // Salva a preferência
    localStorage.setItem('darkMode', isDark);
    
    // Força a atualização do estilo em todos os elementos principais
    document.querySelectorAll('.group, .accordion-content, .button-container').forEach(el => {
        el.style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease';
    });
}

// Verificar preferência salva
const savedTheme = localStorage.getItem('darkMode');
if (savedTheme !== null) {
    setTheme(savedTheme === 'true');
} else {
    // Verifica se o usuário prefere o tema escuro no sistema
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches) {
        setTheme(true);
    }
}

themeToggle.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark'));
});

// Inicializa os acordeons e carrega os aniversariantes quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.accordion-header');
    
    // Fecha todos os acordeons inicialmente
    headers.forEach(header => {
        header.setAttribute('aria-expanded', 'false');
        const content = header.nextElementSibling;
        if (content) content.style.display = 'none';
    });

    // Adiciona evento de clique para cada header
    headers.forEach(header => {
        header.addEventListener('click', function() {
            // Alterna o estado do acordeon clicado
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', !isExpanded);
            
            // Alterna a exibição do conteúdo
            const content = header.nextElementSibling;
            if (content) {
                content.style.display = isExpanded ? 'none' : 'block';
            }
            
            // Alterna a rotação do ícone
            const icon = header.querySelector('.accordion-icon');
            if (icon) {
                icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
            }

            // Se o header clicado for do grupo de aniversariantes, recarrega os dados
            if (header.closest('.aniversariantes') && !isExpanded) {
                carregarAniversariantes();
            }
        });
    });

    // Carrega os aniversariantes inicialmente, mas sem mostrar o modal
    carregarAniversariantes();
    
    // Corrige links nos acordeões para garantir que funcionem corretamente
    corrigirLinks();
});

// Função para corrigir links nos acordeões
function corrigirLinks() {
    document.querySelectorAll('.accordion-content a, .accordion-content button').forEach(elemento => {
        elemento.addEventListener('click', function(e) {
            e.stopPropagation(); // Impede que o clique feche o acordeão
        });
    });
}

// Garantir que os botões dentro dos accordions funcionem
document.querySelectorAll('.accordion-content button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation(); // Impede que o clique se propague para o accordion
    });
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Adicionar efeito hover nos botões
document.querySelectorAll('.button-container button').forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Função para carregar aniversariantes
async function carregarAniversariantes() {
    const lista = document.getElementById('aniversariantes-lista');
    if (!lista) {
        console.error('Elemento aniversariantes-lista não encontrado');
        return;
    }

    try {
        const response = await fetch('aniversarios.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar arquivo JSON');
        }

        const aniversariantes = await response.json();
        
        // Limpa a lista atual
        lista.innerHTML = '';
        
        const dataAtual = new Date();
        const mesAtual = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
        
        // Filtra aniversariantes do mês atual
        const aniversariantesMes = aniversariantes.filter(pessoa => {
            const mesAniversario = pessoa.data.split('/')[1];
            return mesAniversario === mesAtual;
        });
        
        if (aniversariantesMes.length === 0) {
            lista.innerHTML = '<div class="sem-aniversariantes">Nenhum aniversariante este mês</div>';
            return;
        }
        
        // Ordena por dia do mês
>>>>>>> c22f4046933c85b0cee32554ed949fa725f62b11
        aniversariantesMes.sort((a, b) => {
            const diaA = parseInt(a.data.split('/')[0]);
            const diaB = parseInt(b.data.split('/')[0]);
            return diaA - diaB;
        });
        
<<<<<<< HEAD
        const lista = document.getElementById('aniversariantes-lista');
        
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
        
        aniversariantesMes.forEach(aniversariante => {
            const [dia] = aniversariante.data.split('/');
            const isToday = parseInt(dia) === diaAtual;
            
            const aniversarianteElement = document.createElement('div');
            aniversarianteElement.className = `aniversariante-item${isToday ? ' hoje' : ''}`;
            
            aniversarianteElement.innerHTML = `
                <div class="aniversariante-icon">
                    <i class="bi bi-gift${isToday ? '-fill' : ''}"></i>
                </div>
                <div class="aniversariante-info">
                    <div class="aniversariante-data">
                        <i class="bi bi-calendar-event"></i>
                        ${aniversariante.data}
                    </div>
                    <div class="aniversariante-nome">${aniversariante.Servidores}</div>
                </div>
            `;
            
            if (isToday) {
                showBirthdayModal(aniversariante.Servidores);
            }
            
            lista.appendChild(aniversarianteElement);
            
            // Nenhum evento de clique necessário
        });
        
    } catch (error) {
        console.error('Erro ao carregar aniversariantes:', error);
        const lista = document.getElementById('aniversariantes-lista');
        lista.innerHTML = `
            <div class="sem-aniversariantes">
                <i class="bi bi-emoji-frown"></i>
                <p>Erro ao carregar aniversariantes</p>
=======
        // Cria elementos para cada aniversariante
        aniversariantesMes.forEach(pessoa => {
            const dia = pessoa.data.split('/')[0];
            
            const item = document.createElement('div');
            item.className = 'aniversariante-item';
            
            const iconContainer = document.createElement('div');
            iconContainer.className = 'aniversariante-icon';
            iconContainer.innerHTML = '<i class="bi bi-gift"></i>';
            
            const infoContainer = document.createElement('div');
            infoContainer.className = 'aniversariante-info';
            
            const nome = document.createElement('div');
            nome.className = 'aniversariante-nome';
            nome.textContent = pessoa.Servidores;
            
            const data = document.createElement('div');
            data.className = 'aniversariante-data';
            data.innerHTML = `<i class="bi bi-calendar-heart"></i> Dia ${parseInt(dia)}`; // Remove o zero à esquerda
            
            infoContainer.appendChild(nome);
            infoContainer.appendChild(data);
            
            item.appendChild(iconContainer);
            item.appendChild(infoContainer);
            lista.appendChild(item);
            
            // Adiciona evento de clique para celebrar o aniversário
            item.addEventListener('click', function() {
                celebrarAniversario(pessoa.Servidores);
            });
        });

        console.log('Aniversariantes carregados com sucesso');
        
    } catch (error) {
        console.error('Erro ao carregar aniversariantes:', error);
        if (lista) {
            lista.innerHTML = '<div class="sem-aniversariantes">Erro ao carregar aniversariantes</div>';
        }
    }
}

// Manipulação dos links da navbar
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona evento de clique para todos os links da navbar
    document.querySelectorAll('.navbar-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetGroup = document.querySelector(`.group.${targetId}`);
            
            if (!targetGroup) return;

            const header = targetGroup.querySelector('.accordion-header');
            if (!header) return;

            // Fecha todos os outros accordions
            document.querySelectorAll('.accordion-header').forEach(otherHeader => {
                if (otherHeader !== header) {
                    const content = otherHeader.nextElementSibling;
                    otherHeader.setAttribute('aria-expanded', 'false');
                    if (content) content.style.display = 'none';
                    const icon = otherHeader.querySelector('.accordion-icon');
                    if (icon) icon.style.transform = 'rotate(0deg)';
                }
            });

            // Abre o accordion clicado
            const content = header.nextElementSibling;
            header.setAttribute('aria-expanded', 'true');
            if (content) content.style.display = 'block';
            const icon = header.querySelector('.accordion-icon');
            if (icon) icon.style.transform = 'rotate(180deg)';

            // Se for a seção de aniversariantes, recarrega os dados
            if (targetId === 'aniversariantes') {
                carregarAniversariantes();
            }

            // Rola a página até a seção
            targetGroup.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});

// Nova Funcionalidade: Links da Navbar Abrindo Accordions
const navbarLinks = document.querySelectorAll(".navbar-links a[data-target]");

navbarLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault(); // Evita o comportamento padrão do link

        const targetId = this.getAttribute("data-target");
        const targetGroup = document.getElementById(targetId);

        if (targetGroup) {
            const header = targetGroup.querySelector(".accordion-header");
            const content = header.nextElementSibling;

            const isExpanded = header.getAttribute("aria-expanded") === "true";

            if (!isExpanded) {
                // Fecha todos os accordions
                document.querySelectorAll('.accordion-header[aria-expanded="true"]').forEach(openHeader => {
                    openHeader.setAttribute('aria-expanded', 'false');
                    openHeader.nextElementSibling.style.display = 'none';
                    openHeader.nextElementSibling.classList.remove('active');
                });

                // Abre o accordion alvo
                header.setAttribute('aria-expanded', 'true');
                content.style.display = 'block';
                content.classList.add('active');
            }

            // Rola suavemente até o grupo
            targetGroup.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// Função para buscar e exibir dados do clima
async function fetchWeather() {
    const city = 'Campinas';
    const apiKey = 'a5057b2b8909f6f1b65b912656d2beea';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.list && data.list.length > 0) {
            // Processar clima atual
            const currentWeather = data.list[0];
            const temp = Math.round(currentWeather.main.temp);
            const desc = currentWeather.weather[0].description;
            const icon = getWeatherIcon(currentWeather.weather[0].icon);

            document.querySelector('#weather-temp').textContent = `${temp}°C`;
            document.querySelector('#weather-desc').textContent = desc;
            document.querySelector('.current-weather i').className = `bi ${icon}`;

            // Processar previsão para os próximos dias
            const dailyForecasts = {};
            const weekDays = {
                'Sun': 'Dom',
                'Mon': 'Seg',
                'Tue': 'Ter',
                'Wed': 'Qua',
                'Thu': 'Qui',
                'Fri': 'Sex',
                'Sat': 'Sáb'
            };

            data.list.forEach(forecast => {
                const date = new Date(forecast.dt * 1000);
                const day = date.toLocaleDateString('en-US', { weekday: 'short' });
                const localDay = weekDays[day];
                
                if (!dailyForecasts[localDay] || date.getHours() === 12) {
                    dailyForecasts[localDay] = {
                        temp_min: forecast.main.temp_min,
                        temp_max: forecast.main.temp_max,
                        icon: forecast.weather[0].icon,
                        description: forecast.weather[0].description,
                        date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
                    };
                } else {
                    dailyForecasts[localDay].temp_min = Math.min(dailyForecasts[localDay].temp_min, forecast.main.temp_min);
                    dailyForecasts[localDay].temp_max = Math.max(dailyForecasts[localDay].temp_max, forecast.main.temp_max);
                }
            });

            // Renderizar previsão dos próximos dias
            const forecastContainer = document.querySelector('#weather-forecast');
            forecastContainer.innerHTML = '';
            
            Object.entries(dailyForecasts).slice(1, 6).forEach(([day, forecast]) => {
                const forecastElement = document.createElement('div');
                forecastElement.className = 'weather-day';
                forecastElement.innerHTML = `
                    <div class="weather-day-header">${day} ${forecast.date}</div>
                    <i class="bi ${getWeatherIcon(forecast.icon)}"></i>
                    <div class="weather-day-temp">
                        <span class="max">${Math.round(forecast.temp_max)}°</span>
                        <span class="min">${Math.round(forecast.temp_min)}°</span>
                    </div>
                `;
                forecastElement.title = forecast.description;
                forecastContainer.appendChild(forecastElement);
            });
        }
    } catch (error) {
        console.error('Erro ao buscar dados do clima:', error);
        document.querySelector('#weather-temp').textContent = '--°C';
        document.querySelector('#weather-desc').textContent = 'Indisponível';
    }
}

// Função para mapear ícones do OpenWeather para Bootstrap Icons
function getWeatherIcon(weatherIcon) {
    const iconMap = {
        '01d': 'bi-sun-fill',
        '01n': 'bi-moon-stars-fill',
        '02d': 'bi-cloud-sun-fill',
        '02n': 'bi-cloud-moon-fill',
        '03d': 'bi-cloud-fill',
        '03n': 'bi-cloud-fill',
        '04d': 'bi-clouds-fill',
        '04n': 'bi-clouds-fill',
        '09d': 'bi-cloud-drizzle-fill',
        '09n': 'bi-cloud-drizzle-fill',
        '10d': 'bi-cloud-rain-fill',
        '10n': 'bi-cloud-rain-fill',
        '11d': 'bi-cloud-lightning-fill',
        '11n': 'bi-cloud-lightning-fill',
        '13d': 'bi-snow2',
        '13n': 'bi-snow2',
        '50d': 'bi-cloud-haze-fill',
        '50n': 'bi-cloud-haze-fill'
    };

    return iconMap[weatherIcon] || 'bi-cloud-fill';
}

// Atualizar o clima a cada 30 minutos
fetchWeather();
setInterval(fetchWeather, 30 * 60 * 1000);

// Adicionar tooltips aos botões
document.querySelectorAll('.button-container button').forEach(button => {
    const originalText = button.textContent;
    button.setAttribute('title', originalText);
});

// Animação suave ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Funções do Bloco de Notas
// Funções para o Modal de Feriados
let holidays = [];
let currentMonth = new Date().getMonth();
let currentYear = 2025;

async function loadHolidays() {
    try {
        const response = await fetch('feriados_2025.json');
        holidays = await response.json();
        
        // Ordenar feriados por data
        holidays.sort((a, b) => new Date(a.data.split('/').reverse().join('-')) - new Date(b.data.split('/').reverse().join('-')));
        
        // Encontrar o próximo feriado
        const today = new Date();
        const nextHoliday = holidays.find(h => {
            const [day, month, year] = h.data.split('/');
            const holidayDate = new Date(year, month - 1, day);
            return holidayDate > today;
        });

        if (nextHoliday) {
            const [day, month] = nextHoliday.data.split('/');
            currentMonth = parseInt(month) - 1;
        }
        
        updateCurrentMonth();
        renderHolidays();
        updateNextHolidayPreview();
    } catch (error) {
        console.error('Erro ao carregar feriados:', error);
    }
}

function getWeekday(dateStr) {
    const [day, month, year] = dateStr.split('/');
    const date = new Date(year, month - 1, day);
    const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return weekdays[date.getDay()];
}

function formatDate(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return `${day}/${month}/${year}`;
}

function updateCurrentMonth() {
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    document.getElementById('current-month').textContent = `${monthNames[currentMonth]} ${currentYear}`;
}

function showHolidays() {
    const modal = document.getElementById('holiday-modal');
    loadHolidays(); // Carrega os feriados apenas quando o botão é clicado
    modal.style.display = 'block';
}

function closeHolidayModal() {
    const modal = document.getElementById('holiday-modal');
    modal.style.display = 'none';
}

function prevMonth() {
    currentMonth = (currentMonth - 1 + 12) % 12;
    updateCurrentMonth();
    renderHolidays();
}

function nextMonth() {
    currentMonth = (currentMonth + 1) % 12;
    updateCurrentMonth();
    renderHolidays();
}

function calcularDiasRestantes(data) {
    const [dia, mes, ano] = data.split('/');
    const dataFeriado = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    
    // Zerar as horas para comparar apenas as datas
    dataFeriado.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);
    
    const diffTempo = dataFeriado - hoje;
    const diffDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24));
    
    if (diffDias < 0) {
        return 'Já passou';
    } else if (diffDias === 0) {
        return 'Hoje';
    } else if (diffDias === 1) {
        return 'Amanhã';
    } else {
        return `Faltam ${diffDias} dias`;
    }
}

function updateNextHolidayPreview() {
    const today = new Date();
    const nextHoliday = holidays.find(h => {
        const [day, month, year] = h.data.split('/');
        const holidayDate = new Date(year, month - 1, day);
        return holidayDate > today;
    });

    if (nextHoliday) {
        const date = formatDate(nextHoliday.data);
        const weekday = getWeekday(nextHoliday.data);
        const diasRestantes = calcularDiasRestantes(nextHoliday.data);
        document.getElementById('next-holiday-info').innerHTML = `
            <div class="holiday-item ${nextHoliday.tipo}">
                <div class="holiday-date">${date}</div>
                <div class="holiday-weekday">${weekday}</div>
                <div class="holiday-name">${nextHoliday.nome}</div>
                <div class="holiday-type ${nextHoliday.tipo}">${nextHoliday.tipo}</div>
                <div class="holiday-countdown">${diasRestantes}</div>
>>>>>>> c22f4046933c85b0cee32554ed949fa725f62b11
            </div>
        `;
    }
}

<<<<<<< HEAD
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
=======
function renderHolidays() {
    const container = document.getElementById('holidays-list');
    const monthHolidays = holidays.filter(h => {
        const [day, month, year] = h.data.split('/');
        return parseInt(month) - 1 === currentMonth;
    });
    
    container.innerHTML = monthHolidays.map(holiday => {
        const date = formatDate(holiday.data);
        const weekday = getWeekday(holiday.data);
        const diasRestantes = calcularDiasRestantes(holiday.data);
        return `
            <div class="holiday-item ${holiday.tipo}">
                <div class="holiday-date">${date}</div>
                <div class="holiday-weekday">${weekday}</div>
                <div class="holiday-name">${holiday.nome}</div>
                <div class="holiday-type ${holiday.tipo}">${holiday.tipo}</div>
                <div class="holiday-countdown">${diasRestantes}</div>
            </div>
        `;
    }).join('');
}

// Event Listeners para os Feriados
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('holiday-modal');
    modal.style.display = 'none'; // Garante que o modal começa fechado
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeHolidayModal();
        }
    });

    // Fechar modal com a tecla ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeHolidayModal();
        }
    });
});

// Configuração do Sortable para os grupos
document.addEventListener('DOMContentLoaded', () => {
    const groupsContainer = document.querySelector('.groups-row');
    
    if (groupsContainer) {
        // Garante que todos os grupos tenham IDs únicos
        const groups = groupsContainer.querySelectorAll('.group');
        groups.forEach((group, index) => {
            if (!group.id) {
                group.id = `group-${index}`;
            }
        });
        
        // Inicializa o Sortable
        const sortable = new Sortable(groupsContainer, {
            animation: 150,
            handle: '.accordion-header',
            ghostClass: 'sortable-ghost',
            dragClass: 'sortable-drag',
            onStart: function(evt) {
                // Fecha todos os acordeões abertos durante o arrasto
                const contents = document.querySelectorAll('.accordion-content');
                contents.forEach(content => {
                    content.style.display = 'none';
                });
                const headers = document.querySelectorAll('.accordion-header');
                headers.forEach(header => {
                    header.setAttribute('aria-expanded', 'false');
                });
            },
            onEnd: function(evt) {
                saveGroupOrder();
            }
        });

        // Carrega a ordem salva anteriormente
        loadGroupOrder();
    }
});

// Função para salvar a ordem dos grupos
function saveGroupOrder() {
    const groups = document.querySelectorAll('.groups-row .group');
    const order = Array.from(groups).map(group => group.id);
    localStorage.setItem('groupOrder', JSON.stringify(order));
}

// Função para carregar a ordem salva
function loadGroupOrder() {
    const savedOrder = localStorage.getItem('groupOrder');
    if (savedOrder) {
        const order = JSON.parse(savedOrder);
        const container = document.querySelector('.groups-row');
        
        if (container) {
            const currentGroups = Array.from(container.querySelectorAll('.group'));
            
            // Reordena os grupos de acordo com a ordem salva
            order.forEach(groupId => {
                const group = currentGroups.find(g => g.id === groupId);
                if (group) {
                    container.appendChild(group);
                }
            });
        }
    }
}

// Função para abrir a seção de aniversariantes
function abrirAniversariantes() {
    const aniversariantesGroup = document.querySelector('.group.aniversariantes');
    if (!aniversariantesGroup) return;

    const header = aniversariantesGroup.querySelector('.accordion-header');
    if (!header) return;

    // Fecha todos os outros accordions
    document.querySelectorAll('.accordion-header').forEach(otherHeader => {
        if (otherHeader !== header) {
            const content = otherHeader.nextElementSibling;
            otherHeader.setAttribute('aria-expanded', 'false');
            if (content) content.style.display = 'none';
            const icon = otherHeader.querySelector('.accordion-icon');
            if (icon) icon.style.transform = 'rotate(0deg)';
        }
    });

    // Abre a seção de aniversariantes
    const content = header.nextElementSibling;
    header.setAttribute('aria-expanded', 'true');
    if (content) content.style.display = 'block';
    const icon = header.querySelector('.accordion-icon');
    if (icon) icon.style.transform = 'rotate(180deg)';

    // Recarrega os aniversariantes
    carregarAniversariantes();

    // Rola a página até a seção
    aniversariantesGroup.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Adiciona o evento de clique no link da navbar
document.addEventListener('DOMContentLoaded', function() {
    const navbarAniversariantesLink = document.querySelector('.navbar-links a[href="#aniversariantes"]');
    if (navbarAniversariantesLink) {
        navbarAniversariantesLink.addEventListener('click', function(e) {
            e.preventDefault();
            abrirAniversariantes();
        });
    }
});

// Função para celebrar aniversário
function celebrarAniversario(nome) {
    // Verifica se foi chamado por um evento de clique
    if (!nome) return;
    
    // Seleciona uma mensagem aleatória personalizada
    const mensagem = gerarMensagemAniversario(nome);
    
    // Configura o modal
    document.getElementById('birthday-message').innerHTML = mensagem;
    
    // Exibe o modal
    const modal = document.getElementById('birthday-modal');
    modal.style.display = 'flex';
    
    // Inicia a animação de confete
    criarConfete();
    
    // Adiciona classe de animação ao título
    const titulo = document.getElementById('birthday-title');
    if (titulo) {
        titulo.classList.add('animate-title');
    }
}

// Função para fechar o modal de aniversário
function closeBirthdayModal() {
    const modal = document.getElementById('birthday-modal');
    modal.style.display = 'none';
    
    // Remove as animações
    document.getElementById('birthday-title').classList.remove('animate-title');
    document.getElementById('birthday-message').classList.remove('animate-title');
    
    // Limpa os confetes
    document.getElementById('confetti-container').innerHTML = '';
}

// Função para gerar mensagens personalizadas de aniversário
function gerarMensagemAniversario(nome) {
    // Extrai o primeiro nome
    const primeiroNome = nome.split(' ')[0];
    
    // Array de mensagens personalizadas
    const mensagens = [
        `<p>Parabéns, <strong>${primeiroNome}</strong>! 🎉</p>
        <p>Que este novo ciclo seja repleto de realizações, saúde e muitas alegrias!</p>
        <p>Desejamos um dia especial e um ano incrível pela frente.</p>`,
        
        `<p>Feliz Aniversário, <strong>${primeiroNome}</strong>! 🎂</p>
        <p>Que a felicidade seja sua companheira constante e que todos os seus desejos se realizem!</p>
        <p>Tenha um dia maravilhoso e um ano cheio de conquistas!</p>`,
        
        `<p>Parabéns, <strong>${primeiroNome}</strong>! 🥳</p>
        <p>Desejamos que este novo ano de vida seja repleto de momentos inesquecíveis e muitas conquistas!</p>
        <p>Aproveite seu dia especial!</p>`,
        
        `<p>Feliz Aniversário, <strong>${primeiroNome}</strong>! 🎈</p>
        <p>Que este dia seja apenas o começo de um ano repleto de bênçãos, saúde e prosperidade!</p>
        <p>Conte sempre com nossa amizade e carinho!</p>`,
        
        `<p>Parabéns, <strong>${primeiroNome}</strong>! 💫</p>
        <p>Que seu caminho continue sendo iluminado e que a felicidade esteja sempre presente em sua vida!</p>
        <p>Tenha um aniversário tão especial quanto você!</p>`
    ];
    
    // Seleciona uma mensagem aleatória
    return mensagens[Math.floor(Math.random() * mensagens.length)];
}

// Função para criar efeito de confete
function criarConfete() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = ''; // Limpa confetes anteriores
    
    // Cores para os confetes
    const cores = [
        '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
        '#ff00ff', '#00ffff', '#ff8000', '#8000ff'
    ];
    
    // Duração máxima da animação (em segundos)
    let duracaoMaxima = 0;
    
    // Cria 100 confetes
    for (let i = 0; i < 100; i++) {
        const confete = document.createElement('div');
        confete.className = 'confete';
        
        // Posição inicial aleatória
        const posX = Math.random() * 100;
        const posY = -20 - Math.random() * 80; // Começa acima do container
        
        // Tamanho aleatório
        const tamanho = 5 + Math.random() * 10;
        
        // Cor aleatória
        const cor = cores[Math.floor(Math.random() * cores.length)];
        
        // Velocidade de queda aleatória
        const velocidade = 2 + Math.random() * 5;
        
        // Atraso aleatório
        const atraso = Math.random() * 5;
        
        // Atualiza a duração máxima
        const duracaoTotal = velocidade + atraso;
        if (duracaoTotal > duracaoMaxima) {
            duracaoMaxima = duracaoTotal;
        }
        
        // Aplica estilos
        confete.style.left = `${posX}%`;
        confete.style.top = `${posY}px`;
        confete.style.width = `${tamanho}px`;
        confete.style.height = `${tamanho}px`;
        confete.style.backgroundColor = cor;
        confete.style.animationDuration = `${velocidade}s`;
        confete.style.animationDelay = `${atraso}s`;
        
        container.appendChild(confete);
    }
    
    // Programa o fechamento automático do modal após os confetes terminarem de cair
    // Adiciona 0.5 segundos para garantir que todos os confetes tenham terminado
    setTimeout(closeBirthdayModal, (duracaoMaxima + 0.5) * 1000);
}

// Fecha o modal de aniversário ao clicar fora
window.addEventListener('click', function(event) {
    const modal = document.getElementById('birthday-modal');
    if (event.target === modal) {
        closeBirthdayModal();
    }
});
>>>>>>> c22f4046933c85b0cee32554ed949fa725f62b11
