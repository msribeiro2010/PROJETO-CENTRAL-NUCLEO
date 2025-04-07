// Script para adicionar animação de aniversário ao clicar no nome
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando script de animação de aniversário...');
    
    // Verifica se há animações automáticas em andamento e as para
    if (typeof confetti === 'function' && confetti.reset) {
        confetti.reset();
    }
    
    // Remove qualquer classe de brilho automática que possa ter sido adicionada
    document.querySelectorAll('.aniversariante-brilho').forEach(item => {
        item.classList.remove('aniversariante-brilho');
    });
    
    // Função para parar todas as animações existentes
    window.pararTodasAnimacoes = function() {
        // Remove todas as mensagens de aniversário existentes
        document.querySelectorAll('.aniversario-mensagem').forEach(mensagem => {
            mensagem.classList.add('fadeOut');
            setTimeout(() => {
                if (document.body.contains(mensagem)) {
                    document.body.removeChild(mensagem);
                }
            }, 1000);
        });
        
        // Para o confetti se estiver ativo
        if (typeof confetti === 'function' && confetti.reset) {
            confetti.reset();
        }
    };
    
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
        
        // Primeiro, remove todas as animações existentes para evitar conflitos
        document.querySelectorAll('.aniversariante-brilho').forEach(item => {
            item.classList.remove('aniversariante-brilho');
        });
        
        // Remove todos os ícones festivos existentes
        document.querySelectorAll('.icone-festivo').forEach(icone => {
            if (icone.parentNode) {
                icone.parentNode.removeChild(icone);
            }
        });
        
        // Adiciona eventos de clique aos itens de aniversariante (não apenas aos nomes)
        document.querySelectorAll('.aniversariante-item').forEach(item => {
            // Remove evento existente para evitar duplicação
            item.removeEventListener('click', handleItemClick);
            
            // Adiciona novo evento de clique ao item inteiro
            item.addEventListener('click', handleItemClick);
        });
        
        // Também adiciona eventos aos nomes para compatibilidade
        nomesAniversariantes.forEach(nome => {
            // Adiciona classe e estilo para indicar que é clicável
            nome.classList.add('aniversariante-nome-clicavel');
            nome.style.cursor = 'pointer';
            nome.setAttribute('title', 'Clique para celebrar o aniversário!');
            
            // Remove evento existente para evitar duplicação
            nome.removeEventListener('click', handleClick);
            
            // Adiciona novo evento de clique com stopPropagation para evitar conflitos
            nome.addEventListener('click', handleClick);
        });
        
        console.log(`${nomesAniversariantes.length} aniversariantes encontrados e configurados.`);
    }
    
    // Função para lidar com clique no item inteiro do aniversariante
    function handleItemClick(e) {
        // Evita propagação para outros elementos
        e.preventDefault();
        e.stopPropagation();
        
        // Encontra o nome do aniversariante dentro do item
        const nomeElement = this.querySelector('.aniversariante-nome');
        if (!nomeElement) return;
        
        const nome = nomeElement.textContent.trim().replace('🎂 Hoje!', '').trim();
        console.log('Clique no card do aniversariante:', nome);
        
        // Para todas as animações existentes antes de iniciar uma nova
        pararTodasAnimacoes();
        
        // Adiciona a classe de brilho ao item clicado
        this.classList.add('aniversariante-brilho');
        
        // Celebra o aniversário
        celebrarAniversario(nome);
        
        // Remove classe de clicado de todos os outros itens
        document.querySelectorAll('.aniversariante-clicado').forEach(item => {
            if (item !== this) {
                item.classList.remove('aniversariante-clicado');
                // Também remove a classe de brilho dos outros itens
                item.classList.remove('aniversariante-brilho');
            }
        });
        
        // Adiciona a classe de clicado para mostrar a mensagem de parabéns
        this.classList.add('aniversariante-clicado');
        
        // Garante que a mensagem de parabéns esteja visível
        const mensagemParabens = this.querySelector('.mensagem-parabens');
        if (mensagemParabens) {
            mensagemParabens.style.display = 'block';
        }
        
        // Agenda a remoção da classe após um tempo
        setTimeout(() => {
            this.classList.remove('aniversariante-clicado');
            this.classList.remove('aniversariante-brilho');
            
            // Esconde a mensagem de parabéns
            if (mensagemParabens) {
                mensagemParabens.style.display = 'none';
            }
        }, 10000); // 10 segundos para coincidir com a duração da animação
    }
    
    // Função de manipulação do clique no nome
    function handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Garante que o evento não se propague para outros elementos
        if (e.stopImmediatePropagation) {
            e.stopImmediatePropagation();
        }
        
        const nome = this.textContent.trim().replace('🎂 Hoje!', '').trim();
        console.log('Clique no nome do aniversariante:', nome);
        
        // Para todas as animações existentes antes de iniciar uma nova
        pararTodasAnimacoes();
        
        // Celebra o aniversário
        celebrarAniversario(nome);
        
        // Adiciona classe temporária para destacar o clique
        const itemPai = this.closest('.aniversariante-item');
        if (itemPai) {
            // Adiciona a classe de brilho ao item clicado
            itemPai.classList.add('aniversariante-brilho');
            
            // Remove classe de clicado de todos os outros itens
            document.querySelectorAll('.aniversariante-clicado').forEach(item => {
                if (item !== itemPai) {
                    item.classList.remove('aniversariante-clicado');
                    item.classList.remove('aniversariante-brilho');
                }
            });
            
            itemPai.classList.add('aniversariante-clicado');
            
            // Garante que a mensagem de parabéns esteja visível
            const mensagemParabens = itemPai.querySelector('.mensagem-parabens');
            if (mensagemParabens) {
                mensagemParabens.style.display = 'block';
            }
            
            // Agenda a remoção da classe após um tempo
            setTimeout(() => {
                itemPai.classList.remove('aniversariante-clicado');
                itemPai.classList.remove('aniversariante-brilho');
                
                // Esconde a mensagem de parabéns
                if (mensagemParabens) {
                    mensagemParabens.style.display = 'none';
                }
            }, 10000); // 10 segundos para coincidir com a duração da animação
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
    
    // Função para destacar aniversariantes de hoje (07/04)
    function destacarAniversariantesHoje() {
        const hoje = new Date();
        const diaAtual = hoje.getDate();
        const mesAtual = hoje.getMonth() + 1;
        
        console.log(`Verificando aniversariantes para hoje: ${diaAtual}/${mesAtual}`);
        
        // Verifica todos os itens de aniversariante
        document.querySelectorAll('.aniversariante-item').forEach(item => {
            const dataElement = item.querySelector('.aniversariante-data');
            if (dataElement) {
                const dataTexto = dataElement.textContent.trim();
                const [dia, mes] = dataTexto.split('/');
                
                // Verifica se é aniversariante de hoje
                if (parseInt(dia) === diaAtual && parseInt(mes) === mesAtual) {
                    console.log('Encontrado aniversariante de hoje:', item.querySelector('.aniversariante-nome')?.textContent.trim());
                    
                    // Adiciona classes para destacar
                    item.classList.add('hoje');
                    item.classList.add('aniversariante-hoje');
                    
                    // Garante que esteja visível
                    item.style.display = 'flex';
                    item.style.opacity = '1';
                    item.style.visibility = 'visible';
                }
            }
        });
    }
    
    // Executa a função para destacar aniversariantes de hoje após um tempo
    setTimeout(destacarAniversariantesHoje, 1500);
    
    // Adiciona evento de clique global para fechar animações quando clicar fora
    document.addEventListener('click', function(e) {
        // Se o clique não foi em um aniversariante ou em uma mensagem de aniversário
        if (!e.target.closest('.aniversariante-item') && 
            !e.target.closest('.aniversario-mensagem') && 
            !e.target.closest('.aniversariante-nome')) {
            // Para todas as animações
            pararTodasAnimacoes();
            
            // Remove classes de destaque
            document.querySelectorAll('.aniversariante-clicado, .aniversariante-brilho').forEach(item => {
                item.classList.remove('aniversariante-clicado');
                item.classList.remove('aniversariante-brilho');
            });
        }
    });
});