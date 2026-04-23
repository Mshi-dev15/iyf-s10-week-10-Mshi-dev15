const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let posts = [
    { id: 1, title: "Getting Started with Node.js", author: "John Doe", createdAt: "2026-01-15T10:00:00Z", likes: 10 },
    { id: 2, title: "Express.js Fundamentals", author: "Jane Smith", createdAt: "2026-01-16T14:30:00Z", likes: 15 },
    { id: 3, title: "Node.js Best Practices", author: "John Doe", createdAt: "2026-01-17T09:00:00Z", likes: 8 },
    { id: 4, title: "REST API Design", author: "Alice Brown", createdAt: "2026-01-18T11:00:00Z", likes: 20 }
];

// GET posts with filtering, searching, pagination and sorting
app.get('/api/posts', (req, res) => {
    const { author, search, sort, page = 1, limit = 10 } = req.query;

    let result = [...posts];

    // Filter by author
    if (author) {
        result = result.filter(post =>
            post.author.toLowerCase().includes(author.toLowerCase())
        );
    }

    // Search in title
    if (search) {
        result = result.filter(post =>
            post.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    // Sort
    if (sort === 'newest') {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'popular') {
        result.sort((a, b) => b.likes - a.likes);
    }

    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginated = result.slice(startIndex, endIndex);

    res.json({
        total: result.length,
        page: parseInt(page),
        limit: parseInt(limit),
        data: paginated
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Day 3 server running at http://localhost:${PORT}`);
});