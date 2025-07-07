// Script para adicionar animação de aniversário diretamente na função carregarAniversariantes
// Este script modifica a função original para adicionar o evento de clique diretamente

// Espera até que o DOM esteja carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando script de aniversário inline...');
    
    // Função para mostrar a animação de aniversário
    window.mostrarAnimacaoAniversario = function(nome) {
        console.log('Mostrando animação para:', nome);
        
        // Dispara confete
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#ffc107', '#ff6b6b', '#4dabf7', '#51cf66', '#be4bdb']
            });
            
            // Foguetes laterais após um curto atraso
            setTimeout(function() {
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
        setTimeout(function() {
            mensagem.classList.add('fadeOut');
            setTimeout(function() {
                if (document.body.contains(mensagem)) {
                    document.body.removeChild(mensagem);
                }
            }, 1000);
        }, 8000);
    };
    
    // Modifica a função carregarAniversariantes original
    const originalCarregarAniversariantes = window.carregarAniversariantes;
    
    if (typeof originalCarregarAniversariantes === 'function') {
        console.log('Modificando a função carregarAniversariantes...');
        
        window.carregarAniversariantes = async function() {
            // Chama a função original
            await originalCarregarAniversariantes();
            
            console.log('Adicionando eventos de clique aos aniversariantes...');
            
            // Adiciona eventos de clique a todos os nomes de aniversariantes
            document.querySelectorAll('.aniversariante-nome').forEach(function(nome) {
                // Adiciona estilo de cursor
                nome.style.cursor = 'pointer';
                
                // Adiciona atributo de clique diretamente no HTML
                nome.setAttribute('onclick', `mostrarAnimacaoAniversario('${nome.textContent.trim()}')`);
                
                console.log('Evento de clique adicionado para:', nome.textContent.trim());
            });
        };
    } else {
        console.error('Função carregarAniversariantes não encontrada!');
        
        // Adiciona eventos de clique diretamente
        setInterval(function() {
            document.querySelectorAll('.aniversariante-nome').forEach(function(nome) {
                if (!nome.hasAttribute('onclick')) {
                    nome.style.cursor = 'pointer';
                    nome.setAttribute('onclick', `mostrarAnimacaoAniversario('${nome.textContent.trim()}')`);
                    console.log('Evento de clique adicionado para:', nome.textContent.trim());
                }
            });
        }, 2000);
    }
    
    // Adiciona evento global para garantir que funcione
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('aniversariante-nome')) {
            const nome = e.target.textContent.trim();
            console.log('Clique global em aniversariante:', nome);
            window.mostrarAnimacaoAniversario(nome);
        }
    });
});
