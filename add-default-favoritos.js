// Script para adicionar automaticamente favoritos padrão ao carregar o sistema
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando favoritos padrão...');
    
    // Lista de favoritos padrão que devem ser carregados automaticamente
    const defaultFavorites = ['Feriados-2025', 'SecJud', 'Controle/Trabalho', 'ContraChegue'];
    
    // Espera um pouco para garantir que o sistema de favoritos já foi inicializado
    setTimeout(() => {
        // Recupera os favoritos atuais
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        let modified = false;
        
        // Adiciona cada favorito padrão se ainda não estiver na lista
        defaultFavorites.forEach(favorite => {
            if (!favorites.includes(favorite)) {
                console.log(`Adicionando favorito padrão: ${favorite}`);
                favorites.push(favorite);
                modified = true;
            }
        });
        
        // Salva os favoritos atualizados no localStorage
        if (modified) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
            console.log('Favoritos padrão adicionados com sucesso');
            
            // Atualiza a exibição dos favoritos
            if (typeof renderFavorites === 'function') {
                renderFavorites();
            } else {
                console.warn('Função renderFavorites não encontrada. Recarregue a página para ver as alterações.');
            }
        } else {
            console.log('Todos os favoritos padrão já estavam adicionados');
        }
    }, 500); // Espera 500ms para garantir que o sistema já carregou
});
