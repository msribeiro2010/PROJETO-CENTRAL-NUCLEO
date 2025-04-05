// Script para adicionar animação de aniversário ao clicar no nome
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando script de animação de aniversário...');
    
    // Função para criar animação de aniversário
    function celebrarAniversario(nome) {
        console.log('Celebrando aniversário de:', nome);
        
        // Dispara confete
        if (typeof confetti === 'function') {
            // Configuração principal de confete
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#ffc107', '#ff6b6b', '#4dabf7', '#51cf66', '#be4bdb']
            });
            
            // Foguetes laterais
            setTimeout(() => {
                // Foguete da esquerda
                confetti({
                    particleCount: 40,
                    angle: 60,
                    spread: 20,
                    origin: { x: 0.2, y: 0.9 },
                    colors: ['#ff6b6b', '#ffc107', '#fff'],
                    gravity: 0.8,
                    scalar: 1.5,
                    ticks: 300
                });
                
                // Foguete da direita
                confetti({
                    particleCount: 40,
                    angle: 120,
                    spread: 20,
                    origin: { x: 0.8, y: 0.9 },
                    colors: ['#4dabf7', '#51cf66', '#fff'],
                    gravity: 0.8,
                    scalar: 1.5,
                    ticks: 300
                });
            }, 800);
            
            // Mais confetes após um tempo
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    spread: 120,
                    origin: { y: 0.5 },
                    startVelocity: 30
                });
            }, 1500);
        } else {
            console.error('Biblioteca confetti não encontrada!');
        }
        
        // Cria mensagem de parabéns
        const mensagem = document.createElement('div');
        mensagem.className = 'aniversario-mensagem';
        mensagem.innerHTML = `
            <div class="aniversario-balao aniversario-balao-grande">
                <div class="aniversario-balao-header">
                    <i class="bi bi-stars"></i>
                    <span>FELIZ ANIVERSÁRIO!</span>
                    <i class="bi bi-stars"></i>
                </div>
                <div class="aniversario-balao-nome">${nome}</div>
                <div class="aniversario-balao-icons">
                    <i class="bi bi-balloon-heart-fill"></i>
                    <i class="bi bi-gift-fill"></i>
                    <i class="bi bi-cake2-fill"></i>
                    <i class="bi bi-balloon-fill"></i>
                </div>
                <div class="aniversario-balao-mensagem">
                    Desejamos um dia maravilhoso cheio de alegria e realizações!
                </div>
            </div>
        `;
        
        // Adiciona a mensagem ao DOM
        document.body.appendChild(mensagem);
        
        // Reproduz som de festa
        try {
            const audio = new Audio();
            audio.src = 'https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3';
            audio.volume = 0.5;
            audio.play().catch(e => console.log('Erro ao reproduzir som:', e));
        } catch (error) {
            console.log('Erro ao criar elemento de áudio:', error);
        }
        
        // Remove a mensagem após alguns segundos
        setTimeout(() => {
            mensagem.classList.add('fadeOut');
            setTimeout(() => {
                if (document.body.contains(mensagem)) {
                    document.body.removeChild(mensagem);
                }
            }, 1000);
        }, 8000);
    }
    
    // Função para adicionar eventos de clique aos nomes dos aniversariantes
    function adicionarEventosDeClique() {
        console.log('Adicionando eventos de clique aos aniversariantes...');
        
        // Seleciona todos os nomes de aniversariantes
        const nomesAniversariantes = document.querySelectorAll('.aniversariante-nome');
        
        nomesAniversariantes.forEach(nome => {
            // Adiciona classe e estilo para indicar que é clicável
            nome.classList.add('aniversariante-nome-clicavel');
            nome.style.cursor = 'pointer';
            nome.setAttribute('title', 'Clique para celebrar o aniversário!');
            
            // Remove evento existente para evitar duplicação
            nome.removeEventListener('click', handleClick);
            
            // Adiciona novo evento de clique
            nome.addEventListener('click', handleClick);
        });
        
        console.log(`${nomesAniversariantes.length} aniversariantes encontrados e configurados.`);
    }
    
    // Função de manipulação do clique
    function handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const nome = this.textContent.trim();
        console.log('Clique no aniversariante:', nome);
        
        // Celebra o aniversário
        celebrarAniversario(nome);
        
        // Adiciona classe temporária para destacar o clique
        const itemPai = this.closest('.aniversariante-item');
        if (itemPai) {
            itemPai.classList.add('aniversariante-clicado');
            setTimeout(() => {
                itemPai.classList.remove('aniversariante-clicado');
            }, 2000);
        }
    }
    
    // Observa mudanças na lista de aniversariantes para adicionar eventos aos novos itens
    function observarListaAniversariantes() {
        const listaAniversariantes = document.getElementById('aniversariantes-lista');
        
        if (listaAniversariantes) {
            console.log('Observando lista de aniversariantes...');
            
            // Adiciona eventos aos itens existentes
            adicionarEventosDeClique();
            
            // Configura observador para novos itens
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        console.log('Mudanças detectadas na lista de aniversariantes');
                        // Adiciona eventos aos novos itens
                        setTimeout(adicionarEventosDeClique, 100);
                    }
                });
            });
            
            // Inicia observação
            observer.observe(listaAniversariantes, { childList: true, subtree: true });
        } else {
            console.log('Lista de aniversariantes não encontrada, tentando novamente em 1 segundo...');
            setTimeout(observarListaAniversariantes, 1000);
        }
    }
    
    // Inicia observação da lista de aniversariantes
    setTimeout(observarListaAniversariantes, 1000);
});
