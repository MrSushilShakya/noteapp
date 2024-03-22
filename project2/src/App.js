// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    axios.get('http://localhost:3000/notestable')
      .then(res => {
        setNotes(res.data);
      })
      .catch(err => console.error('Error fetching notes:', err));
  };

  const addNote = (text) => {
    axios.post('http://localhost:3000/notestable', { text })
      .then(res => {
        console.log("Note added successfully");
        fetchNotes(); // Update the notes after adding a new note
      })
      .catch(err => console.error('Error adding note:', err));
  };

  const deleteNote = (id) => {
    axios.delete(`http://localhost:3000/notestable/${id}`)
      .then(res => {
        console.log("Note deleted successfully");
        fetchNotes(); // Update the notes after deleting a note
      })
      .catch(err => console.error('Error deleting note:', err));
  };

  return (
    <div className="App">
      <Header/>
      <NoteForm addNote={addNote} />
      <NoteList notes={notes} deleteNote={deleteNote} />
      <Footer />
    </div>
  );
}

export default App;
