const express = require('express');
const app =express();
const PORT = 3000;

app.get('/',(req, res) =>{
    res.send('Welcome to communitHub API');
});

app.get('/about', (req, res)=>{
    res.send('ComminityHub - A community platform');
})

app.get('/api/health', (req, res)=>{
    res.json({
        status:'OK',
        timestamp: new Date().toISOString()
    });
});

//app.use((req, res)=>{
    //res.status(404).json({error: 'Route not found'});
//});
//app.listen(PORT, () =>{
    //console.log(`Server running at http://localhost:${PORT}`);
//});



//app.get('/text',(req, res)=>{
    //res.send('Plain text response');
//});

//app.get('/json',(req, res)=>{
    //res.json({mrssage: `JSON response`,success: true});
//});

//app.get('/error', (req, res)=>{
    //res.status(400).json({error: 'Bad Request'});
//});

//app.get('/old-page',(req, res)=>{
    //res.redirect(`/new-page`);  
//});

app.get('/user/:id',(req, res)=>{
    const userId = req.params.id;
    res.json({message: `Getting user ${userId}`});
});

app.get('/search', (req, res)=>{
    const {q, limit =10,page=1}= req.query;
    res.json({
        query:q,
        limit: parseInt(limit),
        page: parseInt(page)
    });
});

app.get('/posts/:postId/comments/:commentId', (req, res)=>{
    const{postId, commentId} = req.params;
    res.json({postId, commentId});
});

// 404 handler - ALWAYS LAST
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});