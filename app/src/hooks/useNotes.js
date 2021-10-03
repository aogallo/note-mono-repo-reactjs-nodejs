import { useState, useEffect } from 'react';
import noteService from '../services/notes';

const useNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (noteObject) => {
    noteService.create(noteObject).then((returnedObject) => {
      setNotes(notes.concat(returnedObject));
    });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    return noteService.update(id, changedNote).then((returnedNote) => {
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
    });
  };

  return {
    notes,
    addNote,
    toggleImportanceOf,
  };
};

export default useNotes;
