import React from 'react';
import { Link } from 'react-router-dom';

const Note = ({ note, toggleImportance }) => {
  return (
    <li>
      <Link to={`/notes/${note.id}`}>{note.content}</Link>
      <button onClick={toggleImportance}>
        make {note.important ? 'not' : ''} important
      </button>
    </li>
  );
};

export default Note;
