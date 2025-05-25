// Gestor de Notas
document.addEventListener('DOMContentLoaded', function() {
    // Definir cores disponíveis
    const noteColors = [
        { name: 'default', color: '#f8fafc' },
        { name: 'blue', color: '#93c5fd' },
        { name: 'green', color: '#86efac' },
        { name: 'yellow', color: '#fde047' },
        { name: 'red', color: '#fca5a5' },
        { name: 'purple', color: '#d8b4fe' },
        { name: 'pink', color: '#f9a8d4' },
        { name: 'orange', color: '#fdba74' }
    ];

    // Criar e adicionar o botão toggle e o painel de notas
    const notesContainer = document.createElement('div');
    notesContainer.className = 'notes-container';
    
    const notesToggle = document.createElement('button');
    notesToggle.className = 'notes-toggle';
    notesToggle.innerHTML = '<i class="bi bi-sticky"></i>';
    notesToggle.title = 'Bloco de Notas';
    
    const notesPanel = document.createElement('div');
    notesPanel.className = 'notes-panel';
    notesPanel.innerHTML = `
        <div class="notes-header">
            <h3><i class="bi bi-sticky"></i> Bloco de Notas</h3>
        </div>
        <div class="notes-list"></div>
        <textarea class="note-input" placeholder="Digite sua nota aqui..."></textarea>
        <div class="notes-actions">
            <button class="note-btn add"><i class="bi bi-plus"></i> Adicionar</button>
            <button class="note-btn clear"><i class="bi bi-trash"></i> Limpar Todas</button>
        </div>
    `;
    
    document.body.appendChild(notesContainer);
    notesContainer.appendChild(notesToggle);
    notesContainer.appendChild(notesPanel);
    
    // Carregar notas salvas
    let notes = JSON.parse(localStorage.getItem('userNotes')) || [];
    
    // Função para salvar notas no localStorage
    function saveNotes() {
        localStorage.setItem('userNotes', JSON.stringify(notes));
    }
    
    // Criar seletor de cores
    function createColorPicker() {
        const picker = document.createElement('div');
        picker.className = 'note-color-picker';
        
        noteColors.forEach(colorObj => {
            const colorOption = document.createElement('div');
            colorOption.className = `color-option note-color-${colorObj.name}`;
            colorOption.title = colorObj.name.charAt(0).toUpperCase() + colorObj.name.slice(1);
            picker.appendChild(colorOption);
        });
        
        return picker;
    }
    
    let editingIndex = -1;
    
    // Função para renderizar notas
    function renderNotes() {
        document.querySelectorAll('.floating-note').forEach(el => el.remove());
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note-item floating-note';
            noteElement.draggable = true;
            noteElement.style.background = note.color || noteColors[1].color;
            noteElement.style.color = '#222';
            noteElement.style.position = 'fixed';
            noteElement.style.zIndex = 9999;
            noteElement.style.minWidth = '220px';
            noteElement.style.maxWidth = '320px';
            noteElement.style.boxShadow = '0 4px 24px rgba(49,130,206,0.13)';
            noteElement.style.padding = '18px 18px 18px 18px';
            noteElement.style.borderRadius = '12px';
            noteElement.style.cursor = 'move';
            noteElement.dataset.index = index;
            const pos = note.position || { top: 100 + 40*index, left: 100 + 40*index };
            noteElement.style.top = pos.top + 'px';
            noteElement.style.left = pos.left + 'px';
            // Ícone só no modo escuro
            const icon = document.createElement('i');
            icon.className = 'bi bi-sticky note-dark-icon';
            noteElement.appendChild(icon);
            if (note.created) {
                const dateDiv = document.createElement('div');
                dateDiv.className = 'note-date';
                dateDiv.textContent = note.created;
                dateDiv.style.fontSize = '0.85em';
                dateDiv.style.opacity = '0.8';
                dateDiv.style.marginBottom = '6px';
                noteElement.appendChild(dateDiv);
            }
            // Texto da nota (editável inline)
            const noteTextDiv = document.createElement('div');
            noteTextDiv.textContent = note.text || note;
            noteTextDiv.style.marginBottom = '8px';
            noteTextDiv.style.cursor = 'pointer';
            noteTextDiv.addEventListener('click', startInlineEdit);
            noteElement.appendChild(noteTextDiv);
            // Botões editar/excluir
            const actionsDiv = document.createElement('div');
            actionsDiv.style.display = 'flex';
            actionsDiv.style.gap = '8px';
            actionsDiv.style.position = 'absolute';
            actionsDiv.style.top = '8px';
            actionsDiv.style.right = '8px';
            // Editar
            const editBtn = document.createElement('button');
            editBtn.className = 'note-action-btn note-edit-btn';
            editBtn.title = 'Editar nota';
            editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
            editBtn.style.background = 'transparent';
            editBtn.style.border = 'none';
            editBtn.style.cursor = 'pointer';
            editBtn.style.color = '#2563eb';
            editBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                startInlineEdit();
            });
            actionsDiv.appendChild(editBtn);
            // Excluir
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'note-action-btn note-delete-btn';
            deleteBtn.title = 'Excluir nota';
            deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
            deleteBtn.style.background = 'transparent';
            deleteBtn.style.border = 'none';
            deleteBtn.style.cursor = 'pointer';
            deleteBtn.style.color = '#e53e3e';
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                notes.splice(index, 1);
                saveNotes();
                renderNotes();
            });
            actionsDiv.appendChild(deleteBtn);
            noteElement.appendChild(actionsDiv);
            // Cor
            const colorBtn = document.createElement('div');
            colorBtn.className = 'note-color-btn';
            colorBtn.style.background = note.color || noteColors[1].color;
            noteElement.appendChild(colorBtn);
            const colorPicker = createColorPicker();
            noteElement.appendChild(colorPicker);
            colorBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const allPickers = document.querySelectorAll('.note-color-picker');
                allPickers.forEach(picker => {
                    if (picker !== colorPicker) picker.classList.remove('show');
                });
                colorPicker.classList.toggle('show');
            });
            colorPicker.querySelectorAll('.color-option').forEach(option => {
                option.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const colorName = Array.from(this.classList)
                        .find(cls => cls.startsWith('note-color-'))
                        .replace('note-color-', '');
                    const colorObj = noteColors.find(c => c.name === colorName);
                    colorBtn.style.background = colorObj.color;
                    noteElement.style.background = colorObj.color;
                    if (colorObj.name === 'blue' || colorObj.name === 'default' || colorObj.name === 'yellow' || colorObj.name === 'orange') {
                        noteElement.style.color = '#222';
                    } else {
                        noteElement.style.color = '#fff';
                    }
                    if (typeof notes[index] === 'string') {
                        notes[index] = { text: notes[index], color: colorObj.color, position: pos };
                    } else {
                        notes[index].color = colorObj.color;
                    }
                    saveNotes();
                    colorPicker.classList.remove('show');
                });
            });
            // Drag & drop livre
            let offsetX, offsetY, isDragging = false;
            noteElement.addEventListener('mousedown', function(e) {
                if (e.target.closest('.note-action-btn') || e.target.closest('.note-color-btn') || e.target.tagName === 'TEXTAREA') return;
                isDragging = true;
                offsetX = e.clientX - noteElement.getBoundingClientRect().left;
                offsetY = e.clientY - noteElement.getBoundingClientRect().top;
                noteElement.style.transition = 'none';
                noteElement.style.opacity = '0.85';
            });
            document.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                noteElement.style.left = (e.clientX - offsetX) + 'px';
                noteElement.style.top = (e.clientY - offsetY) + 'px';
            });
            document.addEventListener('mouseup', function(e) {
                if (!isDragging) return;
                isDragging = false;
                noteElement.style.opacity = '1';
                noteElement.style.transition = '';
                notes[index].position = {
                    left: parseInt(noteElement.style.left),
                    top: parseInt(noteElement.style.top)
                };
                saveNotes();
            });
            document.body.appendChild(noteElement);

            // Função para edição inline
            function startInlineEdit() {
                // Evita múltiplos textareas
                if (noteElement.querySelector('textarea')) return;
                const textarea = document.createElement('textarea');
                textarea.value = note.text || note;
                textarea.style.width = '100%';
                textarea.style.minHeight = '60px';
                textarea.style.fontSize = '1.05em';
                textarea.style.marginBottom = '8px';
                textarea.style.borderRadius = '8px';
                textarea.style.border = '1.5px solid #e2e8f0';
                textarea.style.padding = '8px';
                textarea.style.boxSizing = 'border-box';
                textarea.style.resize = 'vertical';
                textarea.style.color = noteElement.style.color;
                textarea.style.background = 'rgba(255,255,255,0.95)';
                noteTextDiv.replaceWith(textarea);
                textarea.focus();
                // Salvar ao sair do campo
                textarea.addEventListener('blur', saveInlineEdit);
                // Salvar ao pressionar Enter (sem Shift)
                textarea.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        textarea.blur();
                    }
                });
                function saveInlineEdit() {
                    const newText = textarea.value.trim();
                    if (newText) {
                        notes[index].text = newText;
                        saveNotes();
                    }
                    renderNotes();
                }
            }
        });
    }
    
    // Remover event listeners antigos e adicionar novo
    const newNotesToggle = notesToggle.cloneNode(true);
    notesToggle.parentNode.replaceChild(newNotesToggle, notesToggle);
    newNotesToggle.addEventListener('click', function() {
        console.log('Botão de notas clicado');
        notesPanel.classList.toggle('show');
    });
    
    // Adicionar nova nota ou editar existente
    const addButton = notesPanel.querySelector('.note-btn.add');
    const noteInput = notesPanel.querySelector('.note-input');
    
    addButton.addEventListener('click', function() {
        const noteText = noteInput.value.trim();
        if (noteText) {
            const now = new Date();
            if (editingIndex >= 0) {
                // Atualiza nota existente
                notes[editingIndex].text = noteText;
                if (!notes[editingIndex].created) {
                    notes[editingIndex].created = now.toLocaleString('pt-BR');
                }
                editingIndex = -1;
            } else {
                // Nova nota
                notes.push({
                    text: noteText,
                    color: noteColors[1].color, // azul
                    created: now.toLocaleString('pt-BR'),
                    position: { top: 100 + 40*notes.length, left: 100 + 40*notes.length }
                });
            }
            noteInput.value = '';
            saveNotes();
            renderNotes();
        }
    });
    
    // Tecla Enter para adicionar nota
    noteInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addButton.click();
        }
    });
    
    // Limpar todas as notas
    const clearButton = notesPanel.querySelector('.note-btn.clear');
    clearButton.addEventListener('click', function() {
        if (notes.length > 0) {
            const confirmed = confirm('Tem certeza que deseja apagar todas as notas?');
            if (confirmed) {
                notes = [];
                saveNotes();
                renderNotes();
            }
        }
    });
    
    // Fechar o painel quando clicar fora
    document.addEventListener('click', function(e) {
        if (!notesContainer.contains(e.target) && notesPanel.classList.contains('show')) {
            notesPanel.classList.remove('show');
        }
        
        // Fechar todos os seletores de cor
        if (!e.target.classList.contains('note-color-btn')) {
            document.querySelectorAll('.note-color-picker').forEach(picker => {
                picker.classList.remove('show');
            });
        }
    });
    
    // Renderizar notas iniciais
    renderNotes();
});