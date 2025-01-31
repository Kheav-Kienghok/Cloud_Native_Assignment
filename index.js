const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = require('./dbConnect');


// 1. Registration Service
app.post("/register", (req, res) => {
    const { studentId, name, email, password } = req.body;
    const query = 'INSERT INTO students (studentId, name, email, password) VALUES (?, ?, ?, ?)';

  db.query(query, [studentId, name, email, password], (err, result) => {
    if (err) {
      return res.status(400).json({ message: 'Registration failed', error: err.message });
    }
    res.status(201).json({ message: 'Student registered successfully', studentId });
  });
});


// 2. Login Service
app.post("/login", (req, res) => {
    const { studentId, password } = req.body;
    const query = 'SELECT * FROM students WHERE studentId = ? AND password = ?';
  
    db.query(query, [studentId, password], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed', error: err.message });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      res.status(200).json({ message: 'Login successful', student: results[0] });
    });
  });


// 3. Search Service
app.get("/search/:studentId", (req, res) => {
  const { studentId } = req.params;
  const query = 'SELECT * FROM students WHERE studentId = ?';

  db.query(query, [studentId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Search failed', error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student found', student: results[0] });
  });
});

// 4. Profile Update Service
app.put("/update/:studentId", (req, res) => {
    const { studentId } = req.params;
    const { name, email, password } = req.body;
    const query = 'UPDATE students SET name = ?, email = ?, password = ? WHERE studentId = ?';
  
    db.query(query, [name, email, password, studentId], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Update failed', error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json({ message: 'Profile updated successfully' });
    });
  });

// 5. Delete User Service
app.delete("/delete/:studentId", (req, res) => {
    const { studentId } = req.params;
    const query = 'DELETE FROM students WHERE studentId = ?';
  
    db.query(query, [studentId], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Deletion failed', error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json({ message: 'Student deleted successfully' });
    });
  });

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});