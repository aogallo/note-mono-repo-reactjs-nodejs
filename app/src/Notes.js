import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import loginService from './services/login';
import Login from './Login';
import NoteForm from './components/NoteForm';
import Notification from './components/Notification';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('user');
    console.log(`loggedUserJson`, loggedUserJson);
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    noteService.setToken('');
    window.localStorage.removeItem('user');
  };

  const addNote = (noteObject) => {
    noteService.create(noteObject).then((returnedObject) => {
      setNotes(notes.concat(returnedObject));
    });
  };

  const toggleImportanceOf = (id, note) => {
    note.important = !note.important;
    noteService
      .update(id, note)
      .then(() => noteService.getAll().then((notes) => setNotes(notes)));
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
            toggleImportance={() => toggleImportanceOf(note.id, note)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Notes;
