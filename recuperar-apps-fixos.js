/**
 * Script para recuperar os apps fixos "Feriados 2025" e "Plantao/Ferias"
 */

// Função para adicionar os apps fixos aos favoritos
function recuperarAppsFavoritos() {
    console.log('Iniciando recuperação dos apps fixos...');
    
    // Obter favoritos atuais do localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // Apps que queremos garantir que estejam nos favoritos
    const appsParaRecuperar = ['Feriados 2025', 'Controle/Trabalho'];
    
    // Flag para verificar se algum app foi adicionado
    let appsAdicionados = false;
    
    // Verificar e adicionar cada app
    appsParaRecuperar.forEach(app => {
        if (!favorites.includes(app)) {
            favorites.push(app);
            console.log(`App "${app}" adicionado aos favoritos`);
            appsAdicionados = true;
        } else {
            console.log(`App "${app}" já está nos favoritos`);
        }
    });
    
    // Se algum app foi adicionado, atualizar o localStorage
    if (appsAdicionados) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Favoritos atualizados no localStorage');
        
        // Renderizar novamente os favoritos para exibir as mudanças
        if (typeof renderFavorites === 'function') {
            renderFavorites();
            console.log('Lista de favoritos atualizada na interface');
        } else {
            console.warn('Função renderFavorites não encontrada. Recarregue a página para ver as alterações.');
        }
        
        // Mostrar mensagem de sucesso
        showToast('Apps fixos recuperados com sucesso!');
    } else {
        console.log('Nenhum app precisou ser recuperado');
        showToast('Apps fixos já estão nos favoritos');
    }
}

// Executar a função quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que o script.js já inicializou os favoritos
    setTimeout(recuperarAppsFavoritos, 500);
});

// Executar a função imediatamente se o documento já estiver carregado
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(recuperarAppsFavoritos, 500);
}
