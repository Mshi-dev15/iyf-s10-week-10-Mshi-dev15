const express = require('express');
const app = express();
const PORT = 3000;

// Welcome message
app.get('/', (req, res) => {
    res.send('Welcome to CommunityHub API!');
});

// About page
app.get('/about', (req, res) => {
    res.send('CommunityHub - A community platform built with Node.js & Express');
});

// Current time as JSON
app.get('/api/time', (req, res) => {
    res.json({ 
        currentTime: new Date().toISOString(),
        message: 'Current server time'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Day 1 server running at http://localhost:${PORT}`);
});