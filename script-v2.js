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
                // Gerar cor única baseada no nome
                const colorIndex = getUniqueColorIndex(person.nome);
                const colors = solidColorPalettes[colorIndex];
                
                const card = document.createElement('div');
                card.className = 'birthday-card';
                card.style.setProperty('--card-index', index);
                card.style.background = colors.bg;
                card.style.borderColor = colors.border;
                
                const day = person.data.split('/')[0];
                const month = person.data.split('/')[1];
                
                // Emojis festivos baseados no setor
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
