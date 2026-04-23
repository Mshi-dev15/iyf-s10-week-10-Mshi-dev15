const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

let nextId = 3;

// GET all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET single user
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
});

// POST create user
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email is required' });
    }

    const newUser = {
        id: nextId++,
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Day 2 server running at http://localhost:${PORT}`);
});