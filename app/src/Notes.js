import React, { useState } from 'react';
import Note from './components/Note';
import Login from './Login';
import NoteForm from './components/NoteForm';
import Notification from './components/Notification';
import useUser from './hooks/useUser';
import useNotes from './hooks/useNotes';
import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const Notes = () => {
  const history = useHistory();

  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const { user, logout } = useUser();
  const { notes, addNote, toggleImportanceOf } = useNotes();

  const handleLogout = async () => {
    await logout();
    history.push('/login');
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
      <Table striped>
        <tbody>
          {notesToShow.map((note, i) => (
            <tr key={note.id}>
              <Note
                note={note}
                toggleImportance={() => toggleImportanceNote(note.id)}
              />
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Notes;
