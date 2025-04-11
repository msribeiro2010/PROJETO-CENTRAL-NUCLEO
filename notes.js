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
    
    // Função para renderizar notas
    function renderNotes() {
        const notesList = notesPanel.querySelector('.notes-list');
        notesList.innerHTML = '';
        
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note-item';
            noteElement.draggable = true;
            noteElement.textContent = note.text || note;
            noteElement.dataset.index = index;
            
            // Adicionar botão de cor
            const colorBtn = document.createElement('div');
            colorBtn.className = 'note-color-btn';
            colorBtn.style.background = note.color || noteColors[0].color;
            noteElement.appendChild(colorBtn);
            
            // Adicionar seletor de cores
            const colorPicker = createColorPicker();
            noteElement.appendChild(colorPicker);
            
            // Evento de clique no botão de cor
            colorBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const allPickers = document.querySelectorAll('.note-color-picker');
                allPickers.forEach(picker => {
                    if (picker !== colorPicker) picker.classList.remove('show');
                });
                colorPicker.classList.toggle('show');
            });
            
            // Eventos de cor
            colorPicker.querySelectorAll('.color-option').forEach(option => {
                option.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const colorName = Array.from(this.classList)
                        .find(cls => cls.startsWith('note-color-'))
                        .replace('note-color-', '');
                    const colorObj = noteColors.find(c => c.name === colorName);
                    
                    // Atualizar cor do botão e da nota
                    colorBtn.style.background = colorObj.color;
                    noteElement.style.background = colorObj.color;
                    
                    // Atualizar nota no array
                    if (typeof notes[index] === 'string') {
                        notes[index] = { text: notes[index], color: colorObj.color };
                    } else {
                        notes[index].color = colorObj.color;
                    }
                    
                    saveNotes();
                    colorPicker.classList.remove('show');
                });
            });
            
            // Aplicar cor salva
            if (note.color) {
                noteElement.style.background = note.color;
            }
            
            // Eventos de drag and drop
            noteElement.addEventListener('dragstart', handleDragStart);
            noteElement.addEventListener('dragend', handleDragEnd);
            noteElement.addEventListener('dragover', handleDragOver);
            noteElement.addEventListener('drop', handleDrop);
            
            // Duplo clique para editar
            noteElement.addEventListener('dblclick', function() {
                const noteInput = notesPanel.querySelector('.note-input');
                noteInput.value = note.text || note;
                notes.splice(index, 1);
                renderNotes();
                saveNotes();
            });
            
            notesList.appendChild(noteElement);
        });
    }
    
    // Funções de drag and drop
    let draggedItem = null;
    
    function handleDragStart(e) {
        draggedItem = this;
        this.classList.add('dragging');
    }
    
    function handleDragEnd(e) {
        this.classList.remove('dragging');
        draggedItem = null;
    }
    
    function handleDragOver(e) {
        e.preventDefault();
        if (this === draggedItem) return;
        
        const notesList = notesPanel.querySelector('.notes-list');
        const items = [...notesList.querySelectorAll('.note-item:not(.dragging)')];
        const nextItem = items.find(item => {
            const rect = item.getBoundingClientRect();
            return e.clientY <= rect.top + rect.height / 2;
        });
        
        if (nextItem) {
            notesList.insertBefore(draggedItem, nextItem);
        } else {
            notesList.appendChild(draggedItem);
        }
    }
    
    function handleDrop(e) {
        e.preventDefault();
        if (this === draggedItem) return;
        
        const draggedIndex = parseInt(draggedItem.dataset.index);
        const droppedIndex = parseInt(this.dataset.index);
        
        // Reordenar array de notas
        const [movedNote] = notes.splice(draggedIndex, 1);
        notes.splice(droppedIndex, 0, movedNote);
        
        saveNotes();
        renderNotes();
    }
    
    // Toggle do painel de notas
    notesToggle.addEventListener('click', function() {
        notesPanel.classList.toggle('show');
    });
    
    // Adicionar nova nota
    const addButton = notesPanel.querySelector('.note-btn.add');
    const noteInput = notesPanel.querySelector('.note-input');
    
    addButton.addEventListener('click', function() {
        const noteText = noteInput.value.trim();
        if (noteText) {
            notes.push({ text: noteText, color: noteColors[0].color });
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