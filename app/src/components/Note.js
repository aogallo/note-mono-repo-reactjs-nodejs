import React from 'react';

const Note = ({ key, note, toggleImportance }) => {
  return (
    <li key={key}>
      {note.content}
      <button onClick={toggleImportance}>
        make {note.important ? 'not' : ''} important
      </button>
    </li>
  );
};

export default Note;
