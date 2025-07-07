// Script para adicionar animações especiais aos aniversariantes do dia
document.addEventListener('DOMContentLoaded', function() {
    // Função para criar efeito de confete para aniversariantes do dia
    function celebrarAniversariante(nome, isClick = false) {
        console.log(`Celebrando aniversário de: ${nome}`);
        
        // Verifica se a biblioteca confetti está disponível
        if (typeof confetti === 'function') {
            // Configuração do confete com cores festivas
            const confettiConfig = {
                particleCount: isClick ? 200 : 100,
                spread: isClick ? 100 : 70,
                origin: { y: 0.6 },
                colors: ['#ffc107', '#ff6b6b', '#4dabf7', '#51cf66', '#be4bdb'],
                disableForReducedMotion: true
            };
            
            // Dispara o confete
            confetti(confettiConfig);
            
            // Dispara novamente após um intervalo para criar efeito contínuo
            setTimeout(() => {
                confetti({
                    ...confettiConfig,
                    particleCount: isClick ? 150 : 50,
                    origin: { y: 0.7 }
                });
            }, 500);
            
            // Se for um clique, adiciona mais efeitos especiais
            if (isClick) {
                // Adiciona foguetes (confete que sobe)
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
            }
        }
        
        // Adiciona uma mensagem de parabéns que aparece e desaparece
        const mensagem = document.createElement('div');
        mensagem.className = 'aniversario-mensagem';
        
        // Mensagem mais elaborada para cliques
        if (isClick) {
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
        } else {
            mensagem.innerHTML = `
                <div class="aniversario-balao">
                    <i class="bi bi-balloon-heart-fill"></i>
                    <span>Parabéns, ${nome}!</span>
                    <i class="bi bi-balloon-heart-fill"></i>
                </div>
            `;
        }
        
        // Adiciona a mensagem ao DOM
        document.body.appendChild(mensagem);
        
        // Remove a mensagem após alguns segundos (mais tempo para cliques)
        setTimeout(() => {
            mensagem.classList.add('fadeOut');
            setTimeout(() => {
                if (document.body.contains(mensagem)) {
                    document.body.removeChild(mensagem);
                }
            }, 1000);
        }, isClick ? 8000 : 5000);
        
        // Reproduz som de festa se for um clique
        if (isClick) {
            playPartySound();
        }
    }
    
    // Função para reproduzir som de festa
    function playPartySound() {
        try {
            // Cria um elemento de áudio com som de festa
            const audio = new Audio();
            // Usando um som de domínio público ou considere adicionar um arquivo de som ao projeto
            audio.src = 'https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3';
            audio.volume = 0.5; // Volume moderado
            audio.play().catch(e => console.log('Erro ao reproduzir som:', e));
        } catch (error) {
            console.log('Erro ao criar elemento de áudio:', error);
        }
    }
    
    // Função para observar quando um aniversariante do dia é adicionado ao DOM
    function observarAniversariantesDoDia() {
        // Cria um observador de mutações para detectar quando os aniversariantes são carregados
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Verifica se algum dos nós adicionados é um aniversariante do dia
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node.classList.contains('aniversariante-item')) {
                            // Encontra o nome do aniversariante
                            const nomeElement = node.querySelector('.aniversariante-nome');
                            if (nomeElement) {
                                const nome = nomeElement.textContent.trim();
                                
                                // Se for aniversariante do dia, celebra automaticamente
                                if (node.classList.contains('hoje')) {
                                    // Celebra o aniversariante
                                    celebrarAniversariante(nome);
                                    
                                    // Adiciona efeito de brilho ao redor do item
                                    node.classList.add('aniversariante-brilho');
                                    
                                    // Adiciona ícones festivos
                                    const icones = ['🎂', '🎉', '🎁', '🎈'];
                                    icones.forEach((icone, index) => {
                                        const span = document.createElement('span');
                                        span.className = 'icone-festivo';
                                        span.textContent = icone;
                                        span.style.animationDelay = `${index * 0.2}s`;
                                        node.appendChild(span);
                                    });
                                }
                                
                                // Adiciona evento de clique para todos os aniversariantes
                                nomeElement.style.cursor = 'pointer';
                                nomeElement.classList.add('aniversariante-nome-clicavel');
                                
                                // Adiciona tooltip para indicar que é clicável
                                nomeElement.setAttribute('title', 'Clique para celebrar o aniversário!');
                                
                                // Adiciona evento de clique
                                nomeElement.addEventListener('click', function(e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    
                                    // Celebra com efeitos especiais ao clicar
                                    celebrarAniversariante(nome, true);
                                    
                                    // Adiciona classe temporária para destacar o clique
                                    const itemPai = this.closest('.aniversariante-item');
                                    if (itemPai) {
                                        itemPai.classList.add('aniversariante-clicado');
                                        setTimeout(() => {
                                            itemPai.classList.remove('aniversariante-clicado');
                                        }, 2000);
                                    }
                                });
                            }
                        }
                    });
                }
            });
        });
        
        // Inicia a observação da lista de aniversariantes
        const listaAniversariantes = document.getElementById('aniversariantes-lista');
        if (listaAniversariantes) {
            observer.observe(listaAniversariantes, { childList: true, subtree: true });
        }
    }
    
    // Inicia a observação quando o DOM estiver carregado
    setTimeout(observarAniversariantesDoDia, 1000);
});
