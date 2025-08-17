// Multi-Select Manager - Versão Completa
class MultiSelectManager {
    constructor() {
        this.isMultiSelectMode = false;
        this.selectedButtons = new Set();
        this.init();
    }

    init() {
        this.setupEventListeners();
        // Remover checkboxes existentes dos favoritos
        this.removeCheckboxesFromFavorites();
    }

    setupEventListeners() {
        // Encontrar o botão de ativação
        const enableButton = document.getElementById('enable-multi-select');
        if (enableButton) {
            enableButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMultiSelectMode();
            });
        }

        // Controles de seleção múltipla
        const openSelectedBtn = document.getElementById('open-selected-btn');

        if (openSelectedBtn) {
            openSelectedBtn.addEventListener('click', () => this.openSelected());
        }
    }

    toggleMultiSelectMode() {
        this.isMultiSelectMode = !this.isMultiSelectMode;
        
        if (this.isMultiSelectMode) {
            this.enableMultiSelectMode();
        } else {
            this.disableMultiSelectMode();
        }
    }

    enableMultiSelectMode() {
        // Adicionar classe ao body
        document.body.classList.add('multi-select-mode');
        
        // Ocultar seção de favoritos
        this.hideFavoritesSection();
        
        // Mostrar mensagem informativa
        this.showInfoMessage();
        
        // Encontrar apenas os botões dos grupos de atalhos (excluindo favoritos)
        const buttons = document.querySelectorAll('.button-container button');
        
        buttons.forEach(button => {
            // Criar checkbox para cada botão
            this.addCheckboxToButton(button);
            
            // Adicionar event listener para seleção
            button.addEventListener('click', this.handleButtonSelection.bind(this));
        });
        
        // Remover checkboxes dos favoritos se existirem
        this.removeCheckboxesFromFavorites();
        
        // Mostrar controles de seleção múltipla com animação
        const controls = document.getElementById('multi-select-controls');
        if (controls) {
            controls.style.display = 'block';
            // Forçar reflow para garantir que a animação funcione
            controls.offsetHeight;
            controls.classList.add('show');
        }
        
        // Atualizar texto do botão de ativação
        const enableButton = document.getElementById('enable-multi-select');
        if (enableButton) {
            enableButton.innerHTML = '<i class="bi bi-x-square"></i> Desativar Seleção Múltipla';
            enableButton.classList.add('active');
        }
        
        this.updateControls();
    }

    disableMultiSelectMode() {
        // Remover classe do body
        document.body.classList.remove('multi-select-mode');
        
        // Exibir seção de favoritos novamente
        this.showFavoritesSection();
        
        // Ocultar mensagem informativa
        this.hideInfoMessage();
        
        // Remover todos os checkboxes
        const checkboxes = document.querySelectorAll('.checkbox-container');
        checkboxes.forEach(checkbox => checkbox.remove());
        
        // Remover event listeners apenas dos grupos de atalhos
        const buttons = document.querySelectorAll('.button-container button');
        buttons.forEach(button => {
            button.removeEventListener('click', this.handleButtonSelection.bind(this));
            button.classList.remove('selected');
        });
        
        // Limpar seleções
        this.selectedButtons.clear();
        
        // Ocultar controles de seleção múltipla com animação
        const controls = document.getElementById('multi-select-controls');
        if (controls) {
            controls.classList.remove('show');
            setTimeout(() => {
                controls.style.display = 'none';
            }, 300);
        }
        
        // Atualizar texto do botão de ativação
        const enableButton = document.getElementById('enable-multi-select');
        if (enableButton) {
            enableButton.innerHTML = '<i class="bi bi-check2-square"></i> Ativar Seleção Múltipla';
            enableButton.classList.remove('active');
        }
    }

    addCheckboxToButton(button) {
        // Verificar se já tem checkbox
        if (button.querySelector('.checkbox-container')) {
            return;
        }
        
        // Criar container do checkbox
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-container';
        
        // Criar checkbox input (invisível)
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'link-checkbox';
        checkbox.id = `checkbox-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Criar elemento visual customizado
        const checkboxCustom = document.createElement('div');
        checkboxCustom.className = 'link-checkbox-custom';
        
        // Criar ícone de check
        const checkIcon = document.createElement('i');
        checkIcon.innerHTML = '✓';
        checkboxCustom.appendChild(checkIcon);
        
        // Montar estrutura
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkboxCustom);
        
        // Adicionar evento de clique no container
        checkboxContainer.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle do checkbox
            checkbox.checked = !checkbox.checked;
            
            // Atualizar visual imediatamente com animação
            setTimeout(() => {
                if (checkbox.checked) {
                    button.classList.add('selected');
                    this.selectedButtons.add(button);
                    checkboxCustom.classList.add('checked');
                    // Adicionar classe para feedback visual do botão
                    button.parentElement?.classList.add('selected');
                } else {
                    button.classList.remove('selected');
                    this.selectedButtons.delete(button);
                    checkboxCustom.classList.remove('checked');
                    // Remover classe de feedback visual do botão
                    button.parentElement?.classList.remove('selected');
                }
                
                // Atualizar controles
                this.updateControls();
            }, 10);
            
            // Disparar evento change manualmente
            const changeEvent = new Event('change', { bubbles: true });
            checkbox.dispatchEvent(changeEvent);
        });
        
        // Adicionar evento change no checkbox
        checkbox.addEventListener('change', (e) => {
            // Evitar duplicação se já foi processado pelo clique no container
            if (e.isTrusted) {
                if (checkbox.checked) {
                    button.classList.add('selected');
                    this.selectedButtons.add(button);
                    checkboxCustom.classList.add('checked');
                    // Adicionar classe para feedback visual do botão
                    button.parentElement?.classList.add('selected');
                } else {
                    button.classList.remove('selected');
                    this.selectedButtons.delete(button);
                    checkboxCustom.classList.remove('checked');
                    // Remover classe de feedback visual do botão
                    button.parentElement?.classList.remove('selected');
                }
                this.updateControls();
            }
        });
        
        // Adicionar evento de clique direto no checkbox input
        checkbox.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Atualizar visual imediatamente
            setTimeout(() => {
                if (checkbox.checked) {
                    button.classList.add('selected');
                    this.selectedButtons.add(button);
                    checkboxCustom.classList.add('checked');
                } else {
                    button.classList.remove('selected');
                    this.selectedButtons.delete(button);
                    checkboxCustom.classList.remove('checked');
                }
                this.updateControls();
            }, 0);
        });
        
        // Adicionar ao botão
        button.style.position = 'relative';
        button.appendChild(checkboxContainer);
    }

    addPermanentCheckboxesToFavorites() {
        // Função desabilitada - não adicionar checkboxes aos favoritos
        return;
    }

    removeCheckboxesFromFavorites() {
        // Remover todos os checkboxes existentes dos favoritos
        const favoriteItems = document.querySelectorAll('.favorite-item');
        favoriteItems.forEach(item => {
            const checkboxContainers = item.querySelectorAll('.checkbox-container');
            checkboxContainers.forEach(container => {
                container.remove();
            });
        });
    }

    addPermanentCheckboxToButton(button) {
        // Criar container do checkbox
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-container permanent-checkbox';
        
        // Criar checkbox input (invisível)
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'link-checkbox';
        checkbox.id = `checkbox-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Criar elemento visual customizado
        const checkboxCustom = document.createElement('div');
        checkboxCustom.className = 'link-checkbox-custom';
        
        // Criar ícone de check
        const checkIcon = document.createElement('i');
        checkIcon.innerHTML = '✓';
        checkboxCustom.appendChild(checkIcon);
        
        // Montar estrutura
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkboxCustom);
        
        // Adicionar evento de clique no container
        checkboxContainer.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle do checkbox
            checkbox.checked = !checkbox.checked;
            
            // Atualizar visual imediatamente
            if (checkbox.checked) {
                button.classList.add('selected');
                this.selectedButtons.add(button);
                checkboxCustom.classList.add('checked');
            } else {
                button.classList.remove('selected');
                this.selectedButtons.delete(button);
                checkboxCustom.classList.remove('checked');
            }
            
            // Disparar evento change manualmente
            const changeEvent = new Event('change', { bubbles: true });
            checkbox.dispatchEvent(changeEvent);
            
            // Atualizar controles
            this.updateControls();
        });
        
        // Adicionar evento change no checkbox
        checkbox.addEventListener('change', (e) => {
            // Evitar duplicação se já foi processado pelo clique no container
            if (e.isTrusted) {
                if (checkbox.checked) {
                    button.classList.add('selected');
                    this.selectedButtons.add(button);
                    checkboxCustom.classList.add('checked');
                } else {
                    button.classList.remove('selected');
                    this.selectedButtons.delete(button);
                    checkboxCustom.classList.remove('checked');
                }
                this.updateControls();
            }
        });
        
        // Adicionar ao botão
        button.style.position = 'relative';
        button.appendChild(checkboxContainer);
    }

    addPermanentCheckboxToFavoriteItem(favoriteItem) {
        // Criar container do checkbox
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-container permanent-checkbox';
        
        // Criar checkbox input (invisível)
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'link-checkbox';
        checkbox.id = `checkbox-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Criar elemento visual customizado
        const checkboxCustom = document.createElement('div');
        checkboxCustom.className = 'link-checkbox-custom';
        
        // Criar ícone de check
        const checkIcon = document.createElement('i');
        checkIcon.innerHTML = '✓';
        checkboxCustom.appendChild(checkIcon);
        
        // Montar estrutura
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkboxCustom);
        
        // Adicionar evento de clique no container
        checkboxContainer.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle do checkbox
            checkbox.checked = !checkbox.checked;
            
            // Para favoritos, vamos usar o próprio item como referência
            const button = favoriteItem.querySelector('button') || favoriteItem;
            
            // Atualizar visual imediatamente
            if (checkbox.checked) {
                favoriteItem.classList.add('selected');
                this.selectedButtons.add(button);
                checkboxCustom.classList.add('checked');
            } else {
                favoriteItem.classList.remove('selected');
                this.selectedButtons.delete(button);
                checkboxCustom.classList.remove('checked');
            }
            
            // Disparar evento change manualmente
            const changeEvent = new Event('change', { bubbles: true });
            checkbox.dispatchEvent(changeEvent);
            
            // Atualizar controles
            this.updateControls();
        });
        
        // Evitar que o checkbox interfira com o botão de remoção
        favoriteItem.addEventListener('click', (e) => {
            // Se o clique foi no botão de remoção, não interferir
            if (e.target.closest('.remove-favorite')) {
                return;
            }
            // Se o clique foi no checkbox, não interferir
            if (e.target.closest('.checkbox-container')) {
                return;
            }
        });
        
        // Adicionar evento change no checkbox
        checkbox.addEventListener('change', (e) => {
            // Evitar duplicação se já foi processado pelo clique no container
            if (e.isTrusted) {
                const button = favoriteItem.querySelector('button') || favoriteItem;
                
                if (checkbox.checked) {
                    favoriteItem.classList.add('selected');
                    this.selectedButtons.add(button);
                    checkboxCustom.classList.add('checked');
                } else {
                    favoriteItem.classList.remove('selected');
                    this.selectedButtons.delete(button);
                    checkboxCustom.classList.remove('checked');
                }
                this.updateControls();
            }
        });
        
        // Adicionar ao item favorito
        favoriteItem.style.position = 'relative';
        favoriteItem.appendChild(checkboxContainer);
    }

    handleButtonSelection(event) {
        const button = event.currentTarget;
        const isFavorite = button.closest('.favorite-item');
        
        // Para favoritos, sempre permitir seleção. Para outros, só no modo multi-select
        if (!isFavorite && !this.isMultiSelectMode) return;
        
        // Verificar se o clique foi no checkbox
        if (event.target.closest('.checkbox-container')) {
            return; // Deixar o checkbox lidar com isso
        }
        
        event.preventDefault();
        event.stopPropagation();
        
        const checkbox = button.querySelector('.link-checkbox');
        
        if (checkbox) {
            checkbox.checked = !checkbox.checked;
            
            // Disparar evento change
            const changeEvent = new Event('change', { bubbles: true });
            checkbox.dispatchEvent(changeEvent);
        }
    }

    selectAll() {
        const buttons = document.querySelectorAll('.button-container button, .favorite-item button');
        buttons.forEach(button => {
            const checkbox = button.querySelector('.link-checkbox');
            if (checkbox && !checkbox.checked) {
                checkbox.checked = true;
                const changeEvent = new Event('change', { bubbles: true });
                checkbox.dispatchEvent(changeEvent);
            }
        });
    }

    clearSelection() {
        const buttons = document.querySelectorAll('.button-container button, .favorite-item button');
        buttons.forEach(button => {
            const checkbox = button.querySelector('.link-checkbox');
            if (checkbox && checkbox.checked) {
                checkbox.checked = false;
                const changeEvent = new Event('change', { bubbles: true });
                checkbox.dispatchEvent(changeEvent);
            }
        });
    }

    toggleSelectAll() {
        const buttons = document.querySelectorAll('.button-container button, .favorite-item button');
        const checkboxes = Array.from(buttons).map(button => button.querySelector('.link-checkbox')).filter(checkbox => checkbox);
        
        // Verificar se todos estão selecionados
        const allSelected = checkboxes.every(checkbox => checkbox.checked);
        
        // Se todos estão selecionados, desmarcar todos. Caso contrário, marcar todos
        const shouldSelect = !allSelected;
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked !== shouldSelect) {
                checkbox.checked = shouldSelect;
                const changeEvent = new Event('change', { bubbles: true });
                checkbox.dispatchEvent(changeEvent);
            }
        });
    }

    openSelected() {
        const selectedButtons = Array.from(this.selectedButtons);
        if (selectedButtons.length === 0) {
            alert('Nenhum link selecionado!');
            return;
        }

        let openedCount = 0;
        selectedButtons.forEach(button => {
            let url = null;
            let shouldOpen = false;

            // Verificar se é um botão normal com onclick
            const onclick = button.getAttribute('onclick');
            if (onclick && onclick.includes('window.open')) {
                try {
                    eval(onclick);
                    openedCount++;
                    shouldOpen = true;
                } catch (error) {
                    console.error('Erro ao abrir link:', error);
                }
            }
            // Verificar se é um botão dentro de um item favorito
            else if (button.closest('.favorite-item')) {
                const favoriteItem = button.closest('.favorite-item');
                const favoriteText = favoriteItem.querySelector('span')?.textContent?.trim();
                
                if (favoriteText) {
                    // Tratamento especial para Feriados
                    if (favoriteText.includes('Feriados-2025')) {
                        try {
                            if (typeof showHolidays === 'function') {
                                showHolidays();
                                openedCount++;
                                shouldOpen = true;
                            }
                        } catch (error) {
                            console.error('Erro ao abrir feriados:', error);
                        }
                    } else {
                        // Buscar o botão original para obter a URL
                        // Normalizar o texto removendo quebras de linha e espaços extras
                        const normalizedFavoriteText = favoriteText.replace(/\s+/g, ' ').trim();
                        const originalButton = Array.from(document.querySelectorAll('.button-container button'))
                            .find(btn => {
                                const normalizedButtonText = btn.textContent.replace(/\s+/g, ' ').trim();
                                return normalizedButtonText === normalizedFavoriteText;
                            });
                        
                        if (originalButton) {
                            const originalOnclick = originalButton.getAttribute('onclick');
                            if (originalOnclick && originalOnclick.includes('window.open')) {
                                try {
                                    eval(originalOnclick);
                                    openedCount++;
                                    shouldOpen = true;
                                } catch (error) {
                                    console.error('Erro ao abrir link do favorito:', error);
                                }
                            }
                        } else {
                            console.log('Botão original não encontrado para:', favoriteText);
                            console.log('Texto normalizado:', normalizedFavoriteText);
                        }
                    }
                }
            }
        });

        if (openedCount > 0) {
            // Mostrar mensagem de sucesso
            this.showSuccessMessage(`${openedCount} link(s) aberto(s) com sucesso!`);
            
            // Limpar seleção após abrir
            setTimeout(() => {
                this.clearSelection();
            }, 1000);
        }
    }

    updateControls() {
        const selectedCount = this.selectedButtons.size;
        const countElement = document.getElementById('selected-count');
        const openButton = document.getElementById('open-selected-btn');
        
        if (countElement) {
            countElement.textContent = selectedCount;
        }
        
        if (openButton) {
            openButton.disabled = selectedCount === 0;
            if (selectedCount > 0) {
                openButton.classList.add('has-selection');
            } else {
                openButton.classList.remove('has-selection');
            }
        }
        
        // Atualizar lista de botões selecionados
        this.updateSelectedButtonsList();
    }
    
    updateSelectedButtonsList() {
        const controlsContainer = document.getElementById('multi-select-controls');
        if (!controlsContainer) return;
        
        // Remover lista existente
        const existingList = controlsContainer.querySelector('.selected-buttons-list');
        if (existingList) {
            existingList.remove();
        }
        
        // Criar nova lista se houver botões selecionados
        if (this.selectedButtons.size > 0) {
            const listContainer = document.createElement('div');
            listContainer.className = 'selected-buttons-list';
            listContainer.innerHTML = `
                <h4><i class="bi bi-list-ul"></i> Botões que serão abertos:</h4>
                <ul class="selected-items"></ul>
            `;
            
            const list = listContainer.querySelector('.selected-items');
            
            Array.from(this.selectedButtons).forEach(button => {
                const listItem = document.createElement('li');
                const buttonText = button.textContent.trim();
                listItem.innerHTML = `
                    <i class="bi bi-link-45deg"></i>
                    <span>${buttonText}</span>
                `;
                list.appendChild(listItem);
            });
            
            // Inserir após o header
            const header = controlsContainer.querySelector('.multi-select-header');
            if (header) {
                header.insertAdjacentElement('afterend', listContainer);
            }
        }
    }

    // Método para ocultar a seção de favoritos
    hideFavoritesSection() {
        const favoritesContainer = document.querySelector('.favorites-container');
        if (favoritesContainer) {
            // Salvar o estado de display original se ainda não foi salvo
            if (!favoritesContainer.hasAttribute('data-original-display')) {
                const originalDisplay = window.getComputedStyle(favoritesContainer).display;
                favoritesContainer.setAttribute('data-original-display', originalDisplay);
            }
            
            // Adicionar classe para animação suave
            favoritesContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            favoritesContainer.style.opacity = '0';
            favoritesContainer.style.transform = 'translateY(-10px)';
            
            // Ocultar após a animação
            setTimeout(() => {
                favoritesContainer.style.display = 'none';
            }, 300);
        }
    }

    // Método para exibir a seção de favoritos
    showFavoritesSection() {
        const favoritesContainer = document.querySelector('.favorites-container');
        if (favoritesContainer) {
            // Restaurar o display original
            const originalDisplay = favoritesContainer.getAttribute('data-original-display') || 'block';
            favoritesContainer.style.display = originalDisplay;
            
            // Forçar reflow para garantir que a animação funcione
            favoritesContainer.offsetHeight;
            
            // Animar a entrada
            favoritesContainer.style.opacity = '1';
            favoritesContainer.style.transform = 'translateY(0)';
            
            // Remover estilos de transição após a animação
            setTimeout(() => {
                favoritesContainer.style.transition = '';
                favoritesContainer.style.opacity = '';
                favoritesContainer.style.transform = '';
            }, 300);
        }
    }

    showInfoMessage() {
        const infoMessage = document.getElementById('multi-select-info');
        if (infoMessage) {
            infoMessage.style.display = 'block';
            // Forçar reflow para garantir que a animação funcione
            infoMessage.offsetHeight;
            infoMessage.classList.add('show');
        }
    }

    hideInfoMessage() {
        const infoMessage = document.getElementById('multi-select-info');
        if (infoMessage) {
            infoMessage.classList.remove('show');
            setTimeout(() => {
                infoMessage.style.display = 'none';
            }, 400); // Tempo da transição CSS
        }
    }

    showSuccessMessage(message) {
        // Criar elemento de mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.innerHTML = `
            <i class="bi bi-check-circle-fill"></i>
            <span>${message}</span>
        `;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(messageDiv);
        
        // Remover após 3 segundos
        setTimeout(() => {
            messageDiv.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 3000);
    }

    getSelectedButtons() {
        return Array.from(this.selectedButtons);
    }
}

// Adicionar estilos para animações de mensagem
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    new MultiSelectManager();
});