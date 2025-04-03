// Paleta de cores sólidas para cada aniversariante
const solidColorPalettes = [
    { bg: '#15803d', border: '#22c55e', text: '#ffffff', accent: '#86efac' }, // Verde
    { bg: '#9a3412', border: '#f97316', text: '#ffffff', accent: '#fdba74' }, // Laranja
    { bg: '#6b21a8', border: '#8b5cf6', text: '#ffffff', accent: '#c4b5fd' }, // Roxo
    { bg: '#075985', border: '#0ea5e9', text: '#ffffff', accent: '#7dd3fc' }, // Azul
    { bg: '#991b1b', border: '#ef4444', text: '#ffffff', accent: '#fca5a5' }, // Vermelho
    { bg: '#854d0e', border: '#eab308', text: '#ffffff', accent: '#fde047' }, // Amarelo
    { bg: '#334155', border: '#64748b', text: '#ffffff', accent: '#94a3b8' }, // Cinza
    { bg: '#9f1239', border: '#e11d48', text: '#ffffff', accent: '#fb7185' }, // Rosa
    { bg: '#5b21b6', border: '#7c3aed', text: '#ffffff', accent: '#a78bfa' }, // Violeta
    { bg: '#065f46', border: '#10b981', text: '#ffffff', accent: '#6ee7b7' }, // Esmeralda
    { bg: '#92400e', border: '#f59e0b', text: '#ffffff', accent: '#fcd34d' }, // Âmbar
    { bg: '#44403c', border: '#78716c', text: '#ffffff', accent: '#a8a29e' }  // Pedra
];

// Função para gerar um índice único baseado no nome
function getUniqueColorIndex(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % solidColorPalettes.length;
}

// Função para mostrar mensagem de parabéns
function showBirthdayMessage(name, department) {
    const modal = document.getElementById('birthday-modal');
    const messageContainer = document.getElementById('birthday-message');
    
    // Mensagens personalizadas e elegantes baseadas no departamento
    const messages = {
        'TI': `✨ Feliz Aniversário, ${name}! ✨\n\nQue seu dia seja tão excepcional quanto seu talento técnico! 🚀\nDesejamos que este novo ciclo traga códigos sem bugs, projetos inovadores e muito café de qualidade. 💻☕\n\nParabéns de toda a equipe!`,
        
        'RH': `✨ Feliz Aniversário, ${name}! ✨\n\nQue seu dia seja tão especial quanto o cuidado que você dedica às pessoas! 💫\nDesejamos que este novo ciclo traga muitas conquistas, sorrisos e realizações pessoais. 👥💝\n\nParabéns de toda a equipe!`,
        
        'Financeiro': `✨ Feliz Aniversário, ${name}! ✨\n\nQue seu dia seja próspero e abundante como seus talentos! 📊\nDesejamos que este novo ciclo traga investimentos certeiros, metas alcançadas e muito sucesso. 💰💼\n\nParabéns de toda a equipe!`,
        
        'Administrativo': `✨ Feliz Aniversário, ${name}! ✨\n\nQue seu dia seja tão bem organizado quanto seu trabalho! 📋\nDesejamos que este novo ciclo traga eficiência, conquistas e muitas realizações. 📊✨\n\nParabéns de toda a equipe!`,
        
        'Jurídico': `✨ Feliz Aniversário, ${name}! ✨\n\nQue seu dia seja tão brilhante quanto sua inteligência jurídica! ⚖️\nDesejamos que este novo ciclo traga sabedoria, justiça e grandes conquistas profissionais. 📜✨\n\nParabéns de toda a equipe!`,
        
        'Marketing': `✨ Feliz Aniversário, ${name}! ✨\n\nQue seu dia seja tão criativo e inspirador quanto suas ideias! 💡\nDesejamos que este novo ciclo traga inovação, projetos de sucesso e muita visibilidade. 🎨📱\n\nParabéns de toda a equipe!`,
        
        'Comercial': `✨ Feliz Aniversário, ${name}! ✨\n\nQue seu dia seja tão próspero quanto suas negociações! 📈\nDesejamos que este novo ciclo traga grandes parcerias, metas superadas e muito sucesso. 🤝💼\n\nParabéns de toda a equipe!`,
        
        'Operacional': `✨ Feliz Aniversário, ${name}! ✨\n\nQue seu dia seja tão eficiente quanto seu trabalho! 🔄\nDesejamos que este novo ciclo traga processos bem-sucedidos, conquistas e muita produtividade. 🔧⚙️\n\nParabéns de toda a equipe!`
    };

    const defaultMessage = `✨ Feliz Aniversário, ${name}! ✨\n\nQue este dia especial seja apenas o começo de um ano repleto de alegrias, conquistas e momentos inesquecíveis! 🎉\nDesejamos toda felicidade do mundo e que todos os seus sonhos se realizem neste novo ciclo de vida. 💫\n\nParabéns de toda a equipe!`;
    
    const message = messages[department] || defaultMessage;

    messageContainer.innerHTML = `
        <p class="birthday-greeting">${message}</p>
        <div class="birthday-animation">
            <i class="bi bi-gift-fill"></i>
            <i class="bi bi-balloon-heart-fill"></i>
            <i class="bi bi-cake2-fill"></i>
        </div>
    `;

    modal.style.display = 'block';
    
    // Sequência de efeitos de confete
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB', '#DB7093'],
            ticks: 200
        });
    }, 300);
    
    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors: ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e'],
            ticks: 200
        });
    }, 500);
    
    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors: ['#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6'],
            ticks: 200
        });
    }, 800);
}

// Função para fechar o modal de aniversário
function closeBirthdayModal() {
    const modal = document.getElementById('birthday-modal');
    modal.style.display = 'none';
}

// Função para carregar aniversários com cores sólidas
async function loadBirthdays() {
    const birthdaysList = document.getElementById('aniversariantes-lista');
    
    try {
        birthdaysList.innerHTML = `
            <div class="loading-state">
                <i class="bi bi-arrow-repeat spin"></i>
                <p>Carregando aniversariantes...</p>
            </div>
        `;
        
        const response = await fetch('aniversarios.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const currentMonth = new Date().getMonth() + 1;
        
        // Filtrar aniversários do mês atual
        const currentMonthBirthdays = data.aniversarios.filter(person => {
            const birthMonth = parseInt(person.data.split('/')[1]);
            return birthMonth === currentMonth;
        });
        
        // Ordenar por dia
        currentMonthBirthdays.sort((a, b) => {
            const dayA = parseInt(a.data.split('/')[0]);
            const dayB = parseInt(b.data.split('/')[0]);
            return dayA - dayB;
        });
        
        birthdaysList.innerHTML = '';
        
        if (currentMonthBirthdays.length > 0) {
            currentMonthBirthdays.forEach((person, index) => {
                const colorIndex = getUniqueColorIndex(person.nome);
                const colors = solidColorPalettes[colorIndex];
                
                const card = document.createElement('div');
                card.className = 'birthday-card';
                card.onclick = () => showBirthdayMessage(person.nome, person.setor);
                card.style.setProperty('--card-index', index);
                card.style.background = colors.bg;
                card.style.borderColor = colors.border;
                
                const day = person.data.split('/')[0];
                const month = person.data.split('/')[1];
                
                const deptEmojis = {
                    'TI': '💻',
                    'RH': '👥',
                    'Financeiro': '💰',
                    'Administrativo': '📊',
                    'Jurídico': '⚖️',
                    'Marketing': '📱',
                    'Comercial': '🤝',
                    'Operacional': '🔧'
                };
                
                const deptEmoji = deptEmojis[person.setor] || '🎉';
                
                card.innerHTML = `
                    <div class="birthday-info">
                        <div class="birthday-name" style="color: ${colors.text}">
                            ${person.nome}
                            <span class="emoji-float" style="color: ${colors.accent}">${deptEmoji}</span>
                        </div>
                        <div class="birthday-date" style="color: ${colors.accent}" data-month="${month}">
                            ${day}/${month}
                        </div>
                        <div class="birthday-department" style="color: ${colors.text}">
                            ${person.setor}
                        </div>
                    </div>
                    <div class="card-shine"></div>
                `;
                
                birthdaysList.appendChild(card);
            });
        } else {
            birthdaysList.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-calendar-x"></i>
                    <p>Não há aniversariantes este mês</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Erro ao carregar aniversários:', error);
        
        birthdaysList.innerHTML = `
            <div class="error-state">
                <i class="bi bi-exclamation-circle"></i>
                <p>Não foi possível carregar os aniversariantes</p>
                <button onclick="loadBirthdays()" class="retry-button">
                    <i class="bi bi-arrow-clockwise"></i>
                    Tentar novamente
                </button>
            </div>
        `;
    }
}

// Carregar aniversários quando a página carregar
document.addEventListener('DOMContentLoaded', loadBirthdays);
