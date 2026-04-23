const express = require('express');
const app = express();

// 1. Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Custom logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 3. Mount routes (MUST be before 404 handler)
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

// 4. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 5. 404 handler (MUST be after ALL routes)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 6. Error handler (MUST be last, requires 4 parameters)
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: { message: err.message || 'Internal Server Error', status: statusCode } });
});

module.exports = app;