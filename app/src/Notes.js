import React, { useState } from 'react';
import Note from './components/Note';
import Login from './Login';
import NoteForm from './components/NoteForm';
import Notification from './components/Notification';
import useUser from './hooks/useUser';
import useNotes from './hooks/useNotes';
const Notes = () => {
  const [showAll, logout] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const { user, logout } = useUser();
  const { notes, addNote, toggleImportanceOf } = useNotes();

  const handleLogout = () => {
    logout();
  };

  const toggleImportanceNote = (id) => {
    toggleImportanceOf(id).catch(() => {
      setErrorMessage('Note was already removed from server');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === false);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user ? (
        <NoteForm addNote={addNote} handleLogout={handleLogout} />
      ) : (
        <Login />
      )}

      <div>
        <button>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map((note, i) => (
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceNote(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Notes;
