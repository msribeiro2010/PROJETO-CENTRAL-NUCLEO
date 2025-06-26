// Debounce utility para otimizar a busca
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Função de busca otimizada com debounce
const debouncedSearch = debounce(function(searchTerm) {
    const searchResults = document.getElementById('search-results');
    const buttons = document.querySelectorAll('.button-container button');
    
    if (!searchTerm.trim()) {
        searchResults.classList.remove('show');
        return;
    }
    
    const results = [];
    const term = searchTerm.toLowerCase();
    
    buttons.forEach(button => {
        const text = button.textContent.toLowerCase();
        const icon = button.querySelector('i');
        const iconClass = icon ? icon.className : '';
        
        if (text.includes(term) || iconClass.includes(term)) {
            results.push({
                text: button.textContent.trim(),
                element: button,
                icon: iconClass
            });
        }
    });
    
    displaySearchResults(results, searchTerm);
}, 300);

// Exibir resultados da busca
function displaySearchResults(results, searchTerm) {
    const searchResults = document.getElementById('search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="bi bi-search"></i>
                <span>Nenhum resultado encontrado para "${searchTerm}"</span>
            </div>
        `;
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item" onclick="highlightAndClickButton('${result.text}')">
                <i class="${result.icon}"></i>
                <span>${highlightSearchTerm(result.text, searchTerm)}</span>
            </div>
        `).join('');
    }
    
    searchResults.classList.add('show');
}

// Destacar termo de busca nos resultados
function highlightSearchTerm(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Destacar e clicar no botão encontrado
function highlightAndClickButton(buttonText) {
    const buttons = document.querySelectorAll('.button-container button');
    const targetButton = Array.from(buttons).find(btn =>
        btn.textContent.trim() === buttonText
    );

    if (targetButton) {
        // Destacar temporariamente
        targetButton.style.transform = 'scale(1.1)';
        targetButton.style.boxShadow = '0 0 20px rgba(49, 130, 206, 0.5)';

        // Scroll para o botão
        targetButton.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Clicar automaticamente no botão após o scroll
        setTimeout(() => {
            targetButton.click();
        }, 300);

        // Remover destaque após 2 segundos
        setTimeout(() => {
            targetButton.style.transform = '';
            targetButton.style.boxShadow = '';
        }, 2000);
        
        // Fechar resultados da busca
        document.getElementById('search-results').classList.remove('show');
    }
}

// Exportar para uso global
window.debouncedSearch = debouncedSearch;
window.highlightAndClickButton = highlightAndClickButton; 