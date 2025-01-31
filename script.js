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

// Função para carregar e exibir aniversariantes do mês
async function loadBirthdays() {
    const funcionarios = [
        { nome: 'Marcelo Silva Ribeiro', aniversario: '29/12' },
        { nome: 'Marta Maria de Souza Pinto Silva', aniversario: '28/02' },
        { nome: 'Severino Caetano da Silva Filho', aniversario: '26/03' },
        { nome: 'Natalia Pereira Morais', aniversario: '31/03' },
        { nome: 'Wagner Waldir Leite', aniversario: '07/04' },
        { nome: 'Lloyd Hildevert Beteille Sobrinho', aniversario: '12/04' },
        { nome: 'Thais Helena Santos Camargo Simoes', aniversario: '11/05' },
        { nome: 'Nathany Gazolli de Souza', aniversario: '23/09' },
        { nome: 'Tatiana da Rocha Natale', aniversario: '28/09' }
    ];

    const currentMonth = new Date().getMonth() + 1; // Mês atual (1-12)
    
    // Filtra aniversariantes do mês atual
    const birthdaysThisMonth = funcionarios.filter(funcionario => {
        const birthMonth = parseInt(funcionario.aniversario.split('/')[1]);
        return birthMonth === currentMonth;
    });

    // Ordena por dia do mês
    birthdaysThisMonth.sort((a, b) => {
        const dayA = parseInt(a.aniversario.split('/')[0]);
        const dayB = parseInt(b.aniversario.split('/')[0]);
        return dayA - dayB;
    });

    const birthdayList = document.getElementById('birthday-list');
    birthdayList.innerHTML = '';

    if (birthdaysThisMonth.length === 0) {
        birthdayList.innerHTML = '<div class="birthday-item">Nenhum aniversariante este mês</div>';
        return;
    }

    birthdaysThisMonth.forEach(funcionario => {
        const birthdayItem = document.createElement('div');
        birthdayItem.className = 'birthday-item';
        
        const [day] = funcionario.aniversario.split('/');
        const nome = funcionario.nome.split(' ').slice(0, 2).join(' '); // Mostra apenas primeiro e segundo nome
        
        birthdayItem.innerHTML = `
            ${nome} <span class="date">${day}/${currentMonth.toString().padStart(2, '0')}</span>
        `;
        
        birthdayList.appendChild(birthdayItem);
    });
}

// Carrega os aniversariantes quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    loadBirthdays();
});

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
