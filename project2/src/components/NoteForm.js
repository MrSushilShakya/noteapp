import React, { useState } from 'react';
import './NoteForm.css';
import axios from 'axios';

function NoteForm({ addNote }) {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    if (!text.trim()) return;
    console.log('Adding note...');
    addNote(text);
    setText('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} className="input-field" onChange={handleChange} placeholder="Enter your note" />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm;
