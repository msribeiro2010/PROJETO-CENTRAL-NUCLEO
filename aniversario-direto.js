// Script para adicionar animação de aniversário diretamente
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando script de animação de aniversário direto...');
    
    // Função para adicionar evento de clique diretamente
    function adicionarCliques() {
        // Seleciona todos os elementos com a classe aniversariante-nome
        document.querySelectorAll('.aniversariante-nome').forEach(function(elemento) {
            console.log('Adicionando evento de clique para:', elemento.textContent.trim());
            
            // Adiciona estilo de cursor
            elemento.style.cursor = 'pointer';
            
            // Adiciona evento de clique diretamente
            elemento.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const nome = this.textContent.trim();
                console.log('Clique no aniversariante:', nome);
                
                // Dispara confete
                if (window.confetti) {
                    window.confetti({
                        particleCount: 200,
                        spread: 100,
                        origin: { y: 0.6 }
                    });
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
                setTimeout(function() {
                    mensagem.classList.add('fadeOut');
                    setTimeout(function() {
                        if (document.body.contains(mensagem)) {
                            document.body.removeChild(mensagem);
                        }
                    }, 1000);
                }, 8000);
                
                return false;
            };
        });
    }
    
    // Adiciona os eventos de clique após um curto atraso
    setTimeout(adicionarCliques, 1000);
    
    // Adiciona novamente quando o DOM for modificado
    setInterval(adicionarCliques, 3000);
});
