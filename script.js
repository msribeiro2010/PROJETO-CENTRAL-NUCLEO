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
    document.body.classList.toggle('dark', isDark);
    themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    localStorage.setItem('darkMode', isDark);
}

// Verificar preferência salva
const savedTheme = localStorage.getItem('darkMode');
if (savedTheme !== null) {
    setTheme(savedTheme === 'true');
}

themeToggle.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark'));
});

// Manipulação dos accordions principais
document.addEventListener('DOMContentLoaded', function() {
    // Função auxiliar para fechar accordion
    function closeAccordion(header) {
        const content = header.nextElementSibling;
        const icon = header.querySelector('.accordion-icon');
        header.setAttribute('aria-expanded', 'false');
        if (content) content.style.display = 'none';
        if (icon) icon.style.transform = 'rotate(0deg)';
    }

    // Função auxiliar para abrir accordion
    function openAccordion(header) {
        const content = header.nextElementSibling;
        const icon = header.querySelector('.accordion-icon');
        header.setAttribute('aria-expanded', 'true');
        if (content) content.style.display = 'block';
        if (icon) icon.style.transform = 'rotate(180deg)';
    }

    // Inicializar todos os accordions como fechados
    document.querySelectorAll('.accordion-header, .accordion-subheader').forEach(header => {
        closeAccordion(header);
    });

    // Manipulação dos accordions principais
    document.querySelectorAll('.group').forEach(group => {
        const header = group.querySelector('.accordion-header');
        if (!header) return;

        // Evento de hover
        group.addEventListener('mouseenter', function() {
            // Fecha todos os outros grupos
            document.querySelectorAll('.accordion-header').forEach(otherHeader => {
                if (otherHeader !== header) {
                    closeAccordion(otherHeader);
                }
            });
            // Abre este grupo
            openAccordion(header);
        });

        // Evento de clique ainda mantido para poder fechar manualmente
        header.addEventListener('click', function(e) {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeAccordion(this);
            }
        });
    });

    // Manipulação dos sub-accordions
    document.querySelectorAll('.subgroup').forEach(subgroup => {
        const subHeader = subgroup.querySelector('.accordion-subheader');
        if (!subHeader) return;

        // Evento de hover para sub-grupos
        subgroup.addEventListener('mouseenter', function(e) {
            e.stopPropagation(); // Impede que o evento propague para o grupo pai
            const parentGroup = this.closest('.subgroup').parentElement;

            // Fecha outros sub-accordions no mesmo grupo
            parentGroup.querySelectorAll('.accordion-subheader').forEach(otherSubHeader => {
                if (otherSubHeader !== subHeader) {
                    closeAccordion(otherSubHeader);
                }
            });

            // Abre este sub-grupo
            openAccordion(subHeader);
        });

        // Evento de clique ainda mantido para poder fechar manualmente
        subHeader.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeAccordion(this);
            }
        });
    });
});

// Inicializar todos os accordions como fechados
document.addEventListener('DOMContentLoaded', () => {
    // Fechar todos os accordions principais
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.setAttribute('aria-expanded', 'false');
        header.nextElementSibling.style.display = 'none';
    });
    
    // Fechar todos os sub-accordions
    document.querySelectorAll('.accordion-subheader').forEach(subheader => {
        subheader.setAttribute('aria-expanded', 'false');
        subheader.nextElementSibling.style.display = 'none';
    });
});

// Garantir que os botões dentro dos accordions funcionem
document.querySelectorAll('.accordion-content button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation(); // Impedir que o clique do botão feche o accordion
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
        aniversariantesMes.sort((a, b) => {
            const diaA = parseInt(a.data.split('/')[0]);
            const diaB = parseInt(b.data.split('/')[0]);
            return diaA - diaB;
        });
        
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
        });

        console.log('Aniversariantes carregados com sucesso');
        
    } catch (error) {
        console.error('Erro ao carregar aniversariantes:', error);
        if (lista) {
            lista.innerHTML = '<div class="sem-aniversariantes">Erro ao carregar aniversariantes</div>';
        }
    }
}

// Inicializa os acordeons e carrega os aniversariantes quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.accordion-header');
    
    // Fecha todos os acordeons inicialmente
    headers.forEach(header => {
        header.setAttribute('aria-expanded', 'false');
    });

    // Adiciona evento de clique para cada header
    headers.forEach(header => {
        header.addEventListener('click', function() {
            // Alterna o estado do acordeon clicado
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', !isExpanded);

            // Se o header clicado for do grupo de aniversariantes, recarrega os dados
            if (header.closest('.aniversariantes')) {
                carregarAniversariantes();
            }
        });
    });

    // Carrega os aniversariantes inicialmente
    carregarAniversariantes();
});

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
            </div>
        `;
    }
}

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
