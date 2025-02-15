// Função para atualizar o relógio
function updateClock() {
    const now = new Date();
    const options = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
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

// Atualizar o relógio a cada segundo
setInterval(updateClock, 1000);
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
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Fechar todos os outros accordions principais
        document.querySelectorAll('.accordion-header[aria-expanded="true"]').forEach(openHeader => {
            if (openHeader !== this) {
                openHeader.setAttribute('aria-expanded', 'false');
                openHeader.nextElementSibling.style.display = 'none';
                openHeader.querySelector('.accordion-icon').style.transform = 'rotate(0deg)';
            }
        });

        // Alternar o estado do accordion atual
        this.setAttribute('aria-expanded', !isExpanded);
        content.style.display = isExpanded ? 'none' : 'block';
        
        // Rotacionar o ícone
        const icon = this.querySelector('.accordion-icon');
        icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
    });
});

// Manipulação dos sub-accordions
document.querySelectorAll('.accordion-subheader').forEach(subheader => {
    subheader.addEventListener('click', function(e) {
        e.stopPropagation(); // Impedir que o clique propague para o accordion pai
        const content = this.nextElementSibling;
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Fechar outros sub-accordions no mesmo grupo
        const parentGroup = this.closest('.subgroup').parentElement;
        parentGroup.querySelectorAll('.accordion-subheader[aria-expanded="true"]').forEach(openSubheader => {
            if (openSubheader !== this) {
                openSubheader.setAttribute('aria-expanded', 'false');
                openSubheader.nextElementSibling.style.display = 'none';
                openSubheader.querySelector('.accordion-icon').style.transform = 'rotate(0deg)';
            }
        });

        // Alternar o estado do sub-accordion atual
        this.setAttribute('aria-expanded', !isExpanded);
        content.style.display = isExpanded ? 'none' : 'block';
        
        // Rotacionar o ícone
        const icon = this.querySelector('.accordion-icon');
        icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
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

// Inicializar acordeon dos aniversariantes
document.addEventListener('DOMContentLoaded', function() {
    const aniversariantesHeader = document.querySelector('#aniversariantes .accordion-header');
    const aniversariantesContent = document.getElementById('aniversariantes-content');
    
    if (aniversariantesHeader && aniversariantesContent) {
        // Configurar estado inicial
        let isExpanded = false;
        aniversariantesContent.style.display = 'none';
        aniversariantesHeader.setAttribute('aria-expanded', 'false');
        
        // Adicionar evento de clique
        aniversariantesHeader.addEventListener('click', async function() {
            console.log('Clique detectado no header dos aniversariantes');
            
            // Inverter estado
            isExpanded = !isExpanded;
            
            // Atualizar UI
            this.setAttribute('aria-expanded', isExpanded);
            aniversariantesContent.style.display = isExpanded ? 'block' : 'none';
            
            // Rotacionar ícone
            const icon = this.querySelector('.accordion-icon');
            if (icon) {
                icon.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
            }
            
            // Carregar aniversariantes se estiver expandindo
            if (isExpanded) {
                await carregarAniversariantes();
            }
        });
    }
});

// Função para carregar aniversariantes do arquivo JSON
async function carregarAniversariantes() {
    try {
        console.log('Carregando aniversariantes...');
        const response = await fetch('aniversarios.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar arquivo JSON');
        }
        
        const aniversariantes = await response.json();
        const grid = document.getElementById('aniversariantes-grid');
        
        if (!grid) {
            console.error('Elemento aniversariantes-grid não encontrado');
            return;
        }
        
        // Mês que queremos filtrar (02 para fevereiro)
        const mesFiltro = "02";
        console.log('Filtrando aniversariantes do mês:', mesFiltro);
        
        // Filtrar aniversariantes do mês atual
        const aniversariantesMes = aniversariantes.filter(pessoa => {
            const mesAniversario = pessoa.Niver.split('/')[1];
            const ehFevereiro = mesAniversario === mesFiltro;
            console.log(`Verificando ${pessoa.Servidores}: data ${pessoa.Niver}, mês ${mesAniversario}, é fevereiro? ${ehFevereiro}`);
            return ehFevereiro;
        });
        
        console.log('Aniversariantes encontrados:', aniversariantesMes);
        
        // Limpar grid
        grid.innerHTML = '';
        
        // Adicionar cards
        if (aniversariantesMes.length > 0) {
            aniversariantesMes.forEach(aniversariante => {
                const card = document.createElement('div');
                card.className = 'aniversariante-card';
                
                // Formatar a data para exibir o nome do mês
                const [dia, mes] = aniversariante.Niver.split('/');
                const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                             'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                const dataBonita = `${parseInt(dia)} de ${meses[parseInt(mes) - 1]}`;
                
                card.innerHTML = `
                    <div class="aniversariante-icon">
                        <i class="bi bi-person-circle"></i>
                    </div>
                    <div class="aniversariante-info">
                        <h3>${aniversariante.Servidores}</h3>
                        <p>${dataBonita}</p>
                    </div>
                `;
                grid.appendChild(card);
            });
            
            // Atualizar o título com o número de aniversariantes
            const titulo = document.querySelector('#aniversariantes .header-content');
            if (titulo) {
                const numAniversariantes = aniversariantesMes.length;
                titulo.innerHTML = `
                    <i class="bi bi-gift"></i>
                    Aniversariantes do Mês (${numAniversariantes})
                `;
            }
        } else {
            grid.innerHTML = '<div class="sem-aniversariantes">Nenhum aniversariante este mês</div>';
            
            // Resetar o título
            const titulo = document.querySelector('#aniversariantes .header-content');
            if (titulo) {
                titulo.innerHTML = `
                    <i class="bi bi-gift"></i>
                    Aniversariantes do Mês
                `;
            }
        }
    } catch (error) {
        console.error('Erro ao carregar aniversariantes:', error);
        const grid = document.getElementById('aniversariantes-grid');
        if (grid) {
            grid.innerHTML = '<div class="sem-aniversariantes">Erro ao carregar aniversariantes</div>';
        }
    }
}

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

// Inicializar acordeon do header
document.addEventListener('DOMContentLoaded', function() {
    const headerAccordion = document.querySelector('.header .accordion-header');
    const headerContent = document.getElementById('header-content');
    
    if (headerAccordion && headerContent) {
        console.log('Inicializando acordeon do header...');
        
        // Configurar estado inicial
        let isExpanded = true;
        headerContent.style.display = 'block';
        headerAccordion.setAttribute('aria-expanded', 'true');
        headerAccordion.querySelector('.accordion-icon').style.transform = 'rotate(180deg)';
        
        // Adicionar evento de clique
        headerAccordion.addEventListener('click', function(e) {
            console.log('Clique no header detectado');
            e.preventDefault();
            
            // Inverter o estado
            isExpanded = !isExpanded;
            console.log('Novo estado do header:', isExpanded ? 'expandido' : 'recolhido');
            
            // Atualizar estado
            this.setAttribute('aria-expanded', isExpanded);
            headerContent.style.display = isExpanded ? 'block' : 'none';
            
            // Rotacionar o ícone
            const icon = this.querySelector('.accordion-icon');
            if (icon) {
                icon.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    }
});

// Funções do Bloco de Notas
function toggleNotes() {
    const notesSection = document.getElementById('notes-section');
    const isVisible = notesSection.style.display === 'block';
    
    if (!isVisible) {
        // Expandir o grupo de atendimento externo se necessário
        const atendimentoContent = document.getElementById('atendimento-externo-content');
        const atendimentoHeader = document.querySelector('#atendimento-externo .accordion-header');
        if (atendimentoContent.style.display !== 'block') {
            atendimentoHeader.click();
        }
    }
    
    // Toggle do bloco de notas
    notesSection.style.display = isVisible ? 'none' : 'block';
    
    // Carregar notas se estiver abrindo
    if (!isVisible) {
        loadNotes();
    }
}

function loadNotes() {
    const notesList = document.getElementById('notesList');
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    
    notesList.innerHTML = notes.map((note, index) => `
        <div class="note-item">
            <div class="note-text">${note.text}</div>
            <div class="note-actions">
                <button onclick="editNote(${index})" class="edit-note">
                    <i class="bi bi-pencil"></i>
                </button>
                <button onclick="deleteNote(${index})" class="delete-note">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const text = noteInput.value.trim();
    
    if (text) {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        notes.push({ text, date: new Date().toISOString() });
        localStorage.setItem('notes', JSON.stringify(notes));
        
        noteInput.value = '';
        loadNotes();
    }
}

function editNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const note = notes[index];
    const noteInput = document.getElementById('noteInput');
    
    noteInput.value = note.text;
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
    
    noteInput.focus();
}

function deleteNote(index) {
    if (confirm('Tem certeza que deseja excluir esta nota?')) {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    }
}

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
