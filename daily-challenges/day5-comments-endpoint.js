const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let posts = [
    { id: 1, title: "Getting Started with Node.js", author: "John Doe" },
    { id: 2, title: "Express.js Fundamentals", author: "Jane Smith" }
];

let comments = [
    { id: 1, postId: 1, author: "Alice", content: "Great post!", createdAt: "2026-01-15T11:00:00Z" },
    { id: 2, postId: 1, author: "Bob", content: "Very helpful!", createdAt: "2026-01-15T12:00:00Z" },
    { id: 3, postId: 2, author: "Alice", content: "Loved this!", createdAt: "2026-01-16T15:00:00Z" }
];

let nextCommentId = 4;

// GET post comments
app.get('/api/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    const postComments = comments.filter(c => c.postId === postId);
    res.json(postComments);
});

// POST add comment
app.post('/api/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    const { author, content } = req.body;

    if (!author || !content) {
        return res.status(400).json({ error: 'Author and content are required' });
    }

    const newComment = {
        id: nextCommentId++,
        postId,
        author,
        content,
        createdAt: new Date().toISOString()
    };

    comments.push(newComment);
    res.status(201).json(newComment);
});

// DELETE comment
app.delete('/api/posts/:id/comments/:commentId', (req, res) => {
    const commentId = parseInt(req.params.commentId);
    const commentIndex = comments.findIndex(c => c.id === commentId);

    if (commentIndex === -1) {
        return res.status(404).json({ error: 'Comment not found' });
    }

    comments.splice(commentIndex, 1);
    res.status(204).send();
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Day 5 server running at http://localhost:${PORT}`);
});