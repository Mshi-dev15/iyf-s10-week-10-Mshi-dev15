const express = require('express');
const router = express.Router();

const postsRoutes = require('./posts');
const userRoutes= require ('./users');

router.use('/posts',postsRoutes);
router.use('/users', usersRoutes);

// health check
router.get('/health', (req, res)=>{
    res.json({status: 'OK', timestamp: new Date().toISOString()});
});

module.exports = router;