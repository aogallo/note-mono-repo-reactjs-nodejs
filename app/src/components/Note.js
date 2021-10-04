import React from 'react';
import { Link } from 'react-router-dom';

const Note = ({ note, toggleImportance }) => {
  return (
    <>
      <td>
        <Link to={`/notes/${note.id}`}>{note.content}</Link>
      </td>
      <td>
        <button onClick={toggleImportance}>
          make {note.important ? 'not' : ''} important
        </button>
      </td>
    </>
  );
};

export default Note;
