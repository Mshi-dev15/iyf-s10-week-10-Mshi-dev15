const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

// Logger middleware
const logger = (req, res, next) => {
    const start = Date.now();
    
    // Log when response finishes
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms\n`;
        
        // Log to console
        console.log(logMessage.trim());
        
        // Bonus: Write to log file
        fs.appendFileSync(path.join(__dirname, 'requests.log'), logMessage);
    });
    
    next();
};

app.use(logger);

// Test routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to CommunityHub API' });
});

app.get('/api/posts', (req, res) => {
    res.json([{ id: 1, title: "Test Post" }]);
});

app.get('/api/users', (req, res) => {
    res.json([{ id: 1, name: "John Doe" }]);
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Day 4 server running at http://localhost:${PORT}`);
});