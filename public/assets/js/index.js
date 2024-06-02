document.addEventListener('DOMContentLoaded', () => {
  const saveNoteButton = document.getElementById('save-note');
  const cancelNoteButton = document.getElementById('cancel-note');
  const newNoteButton = document.getElementById('new-note-button');
  const noteTitleInput = document.getElementById('note-title');
  const noteTextInput = document.getElementById('note-text');
  const notesContainer = document.querySelector('.notes');
  const newNoteSection = document.querySelector('.new-note');
  let editCard = null;

  // Initially hide some elements
  saveNoteButton.style.display = 'none';
  cancelNoteButton.style.display = 'none';
  newNoteSection.style.display = 'none';

  newNoteButton.addEventListener('click', () => {
      newNoteButton.style.display = 'none';
      saveNoteButton.style.display = 'inline-block';
      cancelNoteButton.style.display = 'inline-block';
      newNoteSection.style.display = 'block';
      noteTitleInput.focus();
      editCard = null;
  });

  saveNoteButton.addEventListener('click', () => {
      const title = noteTitleInput.value;
      const text = noteTextInput.value;

      if (title && text) {
          if (editCard) {
              editCard.querySelector('h3').textContent = title;
              editCard.querySelector('p').textContent = text;
          } else {
              const newCard = document.createElement('div');
              newCard.classList.add('card');
              newCard.innerHTML = `
                  <h3>${title}</h3>
                  <p>${text}</p>
                  <button class="delete-note"><i class="fas fa-trash-alt"></i></button>
              `;
              notesContainer.appendChild(newCard);
          }
          noteTitleInput.value = '';
          noteTextInput.value = '';
          newNoteButton.style.display = 'inline-block';
          saveNoteButton.style.display = 'none';
          cancelNoteButton.style.display = 'none';
          newNoteSection.style.display = 'none';
      }
  });

  cancelNoteButton.addEventListener('click', () => {
      newNoteButton.style.display = 'inline-block';
      saveNoteButton.style.display = 'none';
      cancelNoteButton.style.display = 'none';
      newNoteSection.style.display = 'none';
      noteTitleInput.value = '';
      noteTextInput.value = '';
      editCard = null;
  });

  notesContainer.addEventListener('click', (event) => {
      if (event.target.closest('.card')) {
          const card = event.target.closest('.card');
          if (event.target.classList.contains('delete-note') || event.target.closest('.delete-note')) {
              card.remove();
          } else {
              const title = card.querySelector('h3').textContent;
              const text = card.querySelector('p').textContent;
              noteTitleInput.value = title;
              noteTextInput.value = text;
              editCard = card;
              newNoteButton.style.display = 'none';
              saveNoteButton.style.display = 'inline-block';
              cancelNoteButton.style.display = 'inline-block';
              newNoteSection.style.display = 'block';
              noteTitleInput.focus();
          }
      }
  });
});
