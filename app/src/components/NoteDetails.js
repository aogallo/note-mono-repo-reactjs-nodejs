import React from 'react';
import notes from '../services/notes';
import { useParams } from 'react-router-dom';

const NoteDetails = ({ notes }) => {
  const { id } = useParams();
  console.log(`notes details`, notes);

  console.log(`id`, id);

  const note = notes.find((note) => note.id === id);

  console.log(`note details 2`, note);

  if (!note) return null;

  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note?.user?.name}</div>
      <div>
        <strong>{note.important ? 'important' : ''}</strong>
      </div>
    </div>
  );
};

export default NoteDetails;
