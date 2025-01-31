const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [];

// 1. Registration Service
app.post("/register", (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const id = users.length + 1;
    users.push({ id, username, password, email });
    res.status(201).json({ message: "User registered successfully", id });
});

// 2. Login Service
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }
    res.json({ message: "Login successful", id: user.id });
});

// 3. Search Service
app.get("/search", (req, res) => {
    const { username } = req.query;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
});

// 4. Profile Update Service
app.put("/update", (req, res) => {
    const { username, email } = req.body;
    let user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    user.email = email || user.email;
    res.json({ message: "User updated successfully" });
});

// 5. Delete User Service
app.delete("/delete", (req, res) => {
    const { username } = req.body;
    users = users.filter(u => u.username !== username);
    res.json({ message: "User deleted successfully" });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});