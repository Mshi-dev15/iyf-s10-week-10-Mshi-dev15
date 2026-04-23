const express = require('express');
const app =express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


const logger = (req,res,next)=>{
    console.log(`${new Date().toISOString()} - ${req.method} ${req.Url}`);
    next();
};
app.use(logger);
const addRequestTime = (req, res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
};
app.use(addRequestTime);

const requireAuth = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).json({error: 'No authorization header'});
     }
     next();
};

app.get('/api/protected',requireAuth,(req, res)=>{
    res.json({message: 'This is protected data'});
});

let posts =[
    {
        id: 1,
        title: "Getting started with node.js",
        content:"node.js is a javascript runtime ...",
        author:"john doe",
        createdAt:"2026-01-15T10:00:00Z",
        likes:10
    },

     {
        id: 2,
        title: "Express.js fundermentals",
        content:"Express is a web framework..",
        author:"Jane smith",
        createdAt:"2026-01-16T14:30:00Z",
        likes: 15
    }
];

const validatePost =(req,res,next)=>{
    const{title, content, author} =req.body;
    const errors= [];

    if (!title || title.length <3){
        errors.push('Title must be at least 3 characters');
    }
    if (!content || content.length <10){
     errors.push('Content must be atleast 10 characters');   
    }
    if (errors.length > 0){
        return res.status(400).json({errors});
    }
    next();
};

let nextId = 3;

app.get('/api/posts', (req, res)=>{
    const {author, sort} = req.query;
    let result =[...posts];

    if (author){
        result = result.filter(post => post.author.toLowerCase().includes(author.toLowerCase())
        );
    }
    if(sort ==='newest'){
        result.sort((a, b)=> new Date(b.createAt)- new Date(a.createAt));
    } else if (sort === 'popular'){
        result.sort((a, b)=> b.likes - a.likes);
    }
    res.json(result);
});

app.get('/api/posts/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find(p =>p.id ===id);
    if (!post){
        return res.status(404).json({error: 'post not found'});
    }
    res.json(post);
});

app.post('/api/posts', validatePost, (req, res)=>{
    const {title, content, author} = req.body;
    if(!title || !content || !author){
        return res.status(400).json({
            error: 'Tittle, content, and author are required'
        });
    }
    const newPost={
        id: nextId++,
        title,
        content,
        author,
        createdAt: new Date().toISOString(),
        likes: 0
    };
    posts.push(newPost);
    res.status(201).json(newPost);
    
});

app.put('/api/posts/:id', (req, res)=>{
    const id =parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id ===id);

    if (postIndex ===-1){
        return res.status(404).json({error:'post not found'});

    }
    const {title, content} = req.body;
    posts[postIndex] ={
        ...posts[postIndex],
        title: title || posts[postIndex].title,
        content: content || posts[postIndex].content,
        updatedAt: new Date().toISOString()
    };
    res.json(posts[postIndex]);
    });

    app.delete('/api/posts/:id', (req, res)=>{
        const id =parseInt(req.params.id);
        const postIndex = posts.findIndex(p => p.id ===id);
         if(postIndex ===-1){
            return res.status(404).json({error:'post not found'});
         } 
         posts.splice(postIndex, 1);
         res.status(204).send();
    })

    app.patch('/api/posts/:id/like',(req, res)=>{
        const id= parseInt(req.params.id);
        const post = posts.find(p => p.id ===id);
        if (!post){
            return res.status(404).json({error:'post not found'});
        }
        post.likes++;
        res.json(post);
    });

    //404 handler
    app.use((req, res)=>{
        res.status(404).json({error: 'Route not found'});

    });
    //error handler middleware
    app.use((err, req, res, next)=>{
        console.error(err.stack);

        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        res.status(statusCode).json({
            error:{
                message,
                status: statusCode
            }
        });
    });

    app.listen(PORT, () =>{
          console.log(`Server running at http://localhost:${PORT}`);
    });

