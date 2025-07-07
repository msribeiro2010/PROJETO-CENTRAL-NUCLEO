// Script para corrigir a animação de aniversário
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando script de correção de animação de aniversário...');
    
    // Função para celebrar aniversário
    window.celebrarAniversario = function(nome) {
        console.log('Celebrando aniversário de:', nome);
        
        // Dispara confete
        try {
            if (window.confetti) {
                window.confetti({
                    particleCount: 200,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#ffc107', '#ff6b6b', '#4dabf7', '#51cf66', '#be4bdb']
                });
                
                // Foguetes laterais
                setTimeout(function() {
                    // Foguete da esquerda
                    window.confetti({
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
                    window.confetti({
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
            } else {
                console.error('Biblioteca confetti não encontrada!');
            }
        } catch (e) {
            console.error('Erro ao disparar confete:', e);
        }
        
        try {
            // Cria mensagem de parabéns
            const mensagem = document.createElement('div');
            mensagem.className = 'aniversario-mensagem';
            mensagem.style.position = 'fixed';
            mensagem.style.top = '50%';
            mensagem.style.left = '50%';
            mensagem.style.transform = 'translate(-50%, -50%)';
            mensagem.style.zIndex = '9999';
            mensagem.style.animation = 'aparecer 0.5s ease-out forwards';
            mensagem.style.pointerEvents = 'none';
            
            mensagem.innerHTML = `
                <div style="background: linear-gradient(135deg, #ff6b6b, #ff8787); color: white; padding: 25px 40px; border-radius: 20px; box-shadow: 0 5px 20px rgba(255, 107, 107, 0.4); display: flex; flex-direction: column; align-items: center; max-width: 90vw; width: 450px; text-align: center;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px; font-size: 1.5rem; font-weight: 800; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
                        <i class="bi bi-stars" style="color: #ffc107; font-size: 1.8rem;"></i>
                        <span>FELIZ ANIVERSÁRIO!</span>
                        <i class="bi bi-stars" style="color: #ffc107; font-size: 1.8rem;"></i>
                    </div>
                    <div style="font-size: 2.2rem; font-weight: 700; margin: 10px 0 20px; color: #fff; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);">${nome}</div>
                    <div style="display: flex; justify-content: center; gap: 20px; margin: 15px 0;">
                        <i class="bi bi-balloon-heart-fill" style="font-size: 2rem; color: #ffc107;"></i>
                        <i class="bi bi-gift-fill" style="font-size: 2rem; color: #ffc107;"></i>
                        <i class="bi bi-cake2-fill" style="font-size: 2rem; color: #ffc107;"></i>
                        <i class="bi bi-balloon-fill" style="font-size: 2rem; color: #ffc107;"></i>
                    </div>
                    <div style="font-size: 1.1rem; font-weight: normal; margin-top: 15px; line-height: 1.4; opacity: 0.9;">
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
                mensagem.style.opacity = '0';
                mensagem.style.transform = 'translate(-50%, -70%)';
                mensagem.style.transition = 'opacity 1s, transform 1s';
                
                setTimeout(function() {
                    if (document.body.contains(mensagem)) {
                        document.body.removeChild(mensagem);
                    }
                }, 1000);
            }, 8000);
        } catch (e) {
            console.error('Erro ao criar mensagem:', e);
        }
    };
    
    // Adiciona evento de clique a todos os nomes de aniversariantes
    function adicionarEventosClique() {
        const nomes = document.querySelectorAll('.aniversariante-nome');
        console.log(`Encontrados ${nomes.length} nomes de aniversariantes`);
        
        nomes.forEach(function(nome) {
            // Adiciona estilo de cursor
            nome.style.cursor = 'pointer';
            
            // Remove evento existente para evitar duplicação
            nome.removeAttribute('onclick');
            
            // Adiciona evento de clique diretamente no HTML
            nome.setAttribute('onclick', 'celebrarAniversario(this.textContent.trim()); return false;');
            
            console.log('Evento de clique adicionado para:', nome.textContent.trim());
        });
    }
    
    // Adiciona eventos inicialmente após um curto atraso
    setTimeout(adicionarEventosClique, 1000);
    
    // Variável para controlar se já adicionamos eventos
    let eventosAdicionados = {};
    
    // Adiciona eventos novamente a cada 5 segundos para garantir, mas apenas para novos elementos
    setInterval(function() {
        const nomes = document.querySelectorAll('.aniversariante-nome');
        let novosElementos = false;
        
        nomes.forEach(function(nome) {
            const textoNome = nome.textContent.trim();
            
            // Verifica se já adicionamos evento para este elemento
            if (!eventosAdicionados[textoNome]) {
                // Adiciona estilo de cursor
                nome.style.cursor = 'pointer';
                
                // Remove evento existente para evitar duplicação
                nome.removeAttribute('onclick');
                
                // Adiciona evento de clique diretamente no HTML
                nome.setAttribute('onclick', 'celebrarAniversario(this.textContent.trim()); return false;');
                
                // Marca como adicionado
                eventosAdicionados[textoNome] = true;
                novosElementos = true;
                
                console.log('Evento de clique adicionado para:', textoNome);
            }
        });
        
        // Só loga se encontrou novos elementos
        if (novosElementos) {
            console.log(`Verificação periódica: ${Object.keys(eventosAdicionados).length} nomes de aniversariantes configurados`);
        }
    }, 5000);
    
    // Adiciona evento global para garantir que funcione
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('aniversariante-nome')) {
            e.preventDefault();
            e.stopPropagation();
            
            const nome = e.target.textContent.trim();
            console.log('Clique global em aniversariante:', nome);
            
            window.celebrarAniversario(nome);
            
            return false;
        }
    });
    
    // Adiciona estilos necessários diretamente no documento
    const style = document.createElement('style');
    style.textContent = `
        @keyframes aparecer {
            from {
                opacity: 0;
                transform: translate(-50%, -30%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
        
        .aniversariante-nome {
            cursor: pointer !important;
            transition: all 0.3s ease;
        }
        
        .aniversariante-nome:hover {
            color: #c92a2a !important;
            transform: scale(1.05);
            text-decoration: underline;
        }
        
        .aniversariante-clicado {
            animation: pulse-click 2s ease-out;
            z-index: 10;
            position: relative;
        }
        
        @keyframes pulse-click {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7); }
            50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255, 107, 107, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 107, 107, 0); }
        }
    `;
    document.head.appendChild(style);
    
    // Carrega a biblioteca confetti se não estiver disponível
    if (typeof confetti !== 'function') {
        console.log('Carregando biblioteca confetti...');
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
        script.onload = function() {
            console.log('Biblioteca confetti carregada com sucesso!');
            window.confetti = confetti;
        };
        document.head.appendChild(script);
    }
});
