import React, { useRef, useState } from 'react';
import Togglable from '../components/Togglable';

const NoteForm = ({ addNote, handleLogout }) => {
  const [newNote, setNewNote] = useState('');
  const toggleRef = useRef();

  const handleChange = (event) => {
    event.preventDefault();
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: false,
    };

    addNote(noteObject);
    setNewNote('');

    toggleRef.current.toggleVisibility();
  };

  return (
    <Togglable buttonLabel="Show create new note" ref={toggleRef}>
      <h2>Create a new Note</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="write your note"
          value={newNote}
          onChange={handleChange}
        />
        <button>save</button>
      </form>

      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Togglable>
  );
};

export default NoteForm;
