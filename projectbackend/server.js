const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'notesdata'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Add a new note
app.post('/notestable', (req, res) => {
  const { text } = req.body;

  const sql = "INSERT INTO notestable (text, createdAt) VALUES (?, CURRENT_TIMESTAMP)";
  const values = [text];

  connection.query(sql, values, (err, data) => {
    if (err) {
      console.error('Error inserting note:', err);
      res.status(500).json({ error: 'Error inserting note' });
      return;
    }
    console.log('Inserted successfully');
    res.status(201).json({ message: 'Note added successfully' });
  });
});
// Get all notes
app.get('/notestable', (req, res) => {
  const sql = "SELECT * FROM notestable";
  connection.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching notes:', err);
      res.status(500).json({ error: 'Error fetching notes' });
      return;
    }
    res.status(200).json(data); // Send the retrieved data as JSON response
  });
});

// Update a note
app.put('/notestable/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const sql = "UPDATE notestable SET text = ? WHERE id = ?";
  const values = [text, id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating note:', err);
      res.status(500).json({ error: 'Error updating note' });
      return;
    }
    res.status(200).json({ message: 'Note updated successfully' });
  });
});

// Delete a note
app.delete('/notestable/:id', (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM notestable WHERE id = ?";
  const values = [id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error deleting note:', err);
      res.status(500).json({ error: 'Error deleting note' });
      return;
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
