// Gestor de Notas
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const notesList = document.getElementById('notes-list');
    const addNoteBtn = document.getElementById('add-note-btn');
    const noteModal = document.getElementById('note-modal');
    const noteForm = document.getElementById('note-form');
    const noteIdInput = document.getElementById('note-id');
    const noteTitleInput = document.getElementById('note-title');
    const noteContentInput = document.getElementById('note-content');
    const noteCategorySelect = document.getElementById('note-category');
    const noteModalTitle = document.getElementById('note-modal