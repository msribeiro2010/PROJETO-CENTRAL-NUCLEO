// Script simplificado para animação de aniversário
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando script de animação de aniversário simplificado...');
    
    // Função para adicionar eventos de clique
    function adicionarEventosClique() {
        // Seleciona todos os nomes de aniversariantes
        const nomes = document.querySelectorAll('.aniversariante-nome');
        console.log(`Encontrados ${nomes.length} nomes de aniversariantes`);
        
        nomes.forEach(nome => {
            // Adiciona estilo de cursor
            nome.style.cursor = 'pointer';
            
            // Remove eventos existentes para evitar duplicação
            nome.removeEventListener('click', celebrarAniversario);
            
            // Adiciona novo evento de clique
            nome.addEventListener('click', celebrarAniversario);
        });
    }
    
    // Função para celebrar aniversário
    function celebrarAniversario(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const nome = this.textContent.trim();
        console.log('Celebrando aniversário de:', nome);
        
        // Dispara confete
        if (typeof confetti === 'function') {
            // Confete principal
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 }
            });
            
            // Foguetes laterais
            setTimeout(() => {
                // Esquerda
                confetti({
                    particleCount: 40,
                    angle: 60,
                    spread: 20,
                    origin: { x: 0.2, y: 0.9 },
                    colors: ['#ff6b6b', '#ffc107', '#fff']
                });
                
                // Direita
                confetti({
                    particleCount: 40,
                    angle: 120,
                    spread: 20,
                    origin: { x: 0.8, y: 0.9 },
                    colors: ['#4dabf7', '#51cf66', '#fff']
                });
            }, 500);
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
        
        // Remove a mensagem após alguns segundos
        setTimeout(() => {
            mensagem.classList.add('fadeOut');
            setTimeout(() => {
                if (document.body.contains(mensagem)) {
                    document.body.removeChild(mensagem);
                }
            }, 1000);
        }, 8000);
        
        // Destaca o item clicado
        const itemPai = this.closest('.aniversariante-item');
        if (itemPai) {
            itemPai.classList.add('aniversariante-clicado');
            setTimeout(() => {
                itemPai.classList.remove('aniversariante-clicado');
            }, 2000);
        }
    }
    
    // Adiciona eventos inicialmente
    setTimeout(adicionarEventosClique, 1000);
    
    // Adiciona eventos novamente quando a lista for atualizada
    const listaAniversariantes = document.getElementById('aniversariantes-lista');
    if (listaAniversariantes) {
        // Cria um observador para detectar mudanças na lista
        const observer = new MutationObserver(() => {
            console.log('Lista de aniversariantes atualizada');
            setTimeout(adicionarEventosClique, 100);
        });
        
        // Inicia observação
        observer.observe(listaAniversariantes, { childList: true, subtree: true });
    }
    
    // Adiciona evento global para garantir que funcione
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('aniversariante-nome')) {
            const nome = e.target.textContent.trim();
            console.log('Clique global em aniversariante:', nome);
            
            // Dispara confete
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 200,
                    spread: 100,
                    origin: { y: 0.6 }
                });
            }
            
            // Cria mensagem simples
            const mensagem = document.createElement('div');
            mensagem.className = 'aniversario-mensagem';
            mensagem.innerHTML = `
                <div class="aniversario-balao">
                    <i class="bi bi-balloon-heart-fill"></i>
                    <span>Parabéns, ${nome}!</span>
                    <i class="bi bi-balloon-heart-fill"></i>
                </div>
            `;
            
            // Adiciona a mensagem ao DOM
            document.body.appendChild(mensagem);
            
            // Remove a mensagem após alguns segundos
            setTimeout(() => {
                mensagem.classList.add('fadeOut');
                setTimeout(() => {
                    if (document.body.contains(mensagem)) {
                        document.body.removeChild(mensagem);
                    }
                }, 1000);
            }, 5000);
        }
    });
});
