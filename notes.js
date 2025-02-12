// Funções para o Bloco de Notas
let notes = JSON.parse(localStorage.getItem('userNotes')) || [];
let editingIndex = -1;

function openNotes() {
    document.getElementById('notesModal').style.display = 'block';
    renderNotes();
}

function closeNotes() {
    document.getElementById('notesModal').style.display = 'none';
    document.getElementById('noteInput').value = '';
    editingIndex = -1;
}

function renderNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note-item';
        noteElement.innerHTML = `
            <div class="note-text">${note}</div>
            <div class="note-actions">
                <button class="edit-note" onclick="editNote(${index})">
                    <i class="bi bi-pencil"></i> Editar
                </button>
                <button class="delete-note" onclick="deleteNote(${index})">
                    <i class="bi bi-trash"></i> Excluir
                </button>
            </div>
        `;
        notesList.appendChild(noteElement);
    });
}

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();
    
    if (noteText) {
        if (editingIndex >= 0) {
            // Editando nota existente
            notes[editingIndex] = noteText;
            editingIndex = -1;
        } else {
            // Adicionando nova nota
            notes.push(noteText);
        }
        
        localStorage.setItem('userNotes', JSON.stringify(notes));
        noteInput.value = '';
        renderNotes();
    }
}

function editNote(index) {
    const noteInput = document.getElementById('noteInput');
    noteInput.value = notes[index];
    editingIndex = index;
    noteInput.focus();
}

function deleteNote(index) {
    if (confirm('Tem certeza que deseja excluir esta nota?')) {
        notes.splice(index, 1);
        localStorage.setItem('userNotes', JSON.stringify(notes));
        renderNotes();
    }
}

// Fechar o modal quando clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('notesModal');
    if (event.target === modal) {
        closeNotes();
    }
}

// Adicionar nota com Enter
document.addEventListener('DOMContentLoaded', function() {
    const noteInput = document.getElementById('noteInput');
    noteInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addNote();
        }
    });
});