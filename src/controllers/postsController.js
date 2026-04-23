const store = require('../data/store');
const getAllPosts = (req, res)=>{
    const {author, sort}= req.query;
    let result = [...store.posts];

    if (author){
        result= result.filter(post=>post.author.toLocaleLowerCase().includes(author.toLocaleLowerCase())
    );
        
    }
    if (sort ==='newest'){
        result.sort((a, b)=>new Date(b.createdAt) -new Date(a.createdAt));
    }else if (sort==='popular'){
        result.sort((a, b)=>b.likes - a.likes);
    }
    res.json(result);
};
const getPostById = (req, res)=>{
    const id=parseInt(req.params.id);
    const post = store.posts.find(p=> p.id===id);

    if (!post){
        return res.status(404).json({error:'Post not Found'});
    }
    res.json(post);
};
const createPost =(req, res)=>{
    const{title, content, author} = req.body;
    const newPost ={
        id:store.nextId++,
        title,
        content,
        author,
        createdAt: new Date().toISOString(),
        likes: 0
    };

    store.posts.push(newPost);
    res.status(201).json(newPost);
};

const updatePost = (req, res)=>{
    const id= parseInt(req.params.id);
    const postIndex = store.posts.findIndex(p =>p.id=== id);
    if (postIndex === -1){
     return res.status(404).json({error:'Post not Found'});   
    }
    const {title, content} =req.body;
    store.posts[postIndex]={
        ...store.posts[postIndex],
        title: title || store.posts[postIndex].title,
        content: content ||store.posts[postIndex].content,
        updatedAt: new Date().toISOString()
    };
    res.json(store.posts[postIndex]);
};
const deletePost =(req, res)=>{
    const id =parseInt(req.params.id);
    const postIndex = store.posts.findIndex(p => p.id === id);
    if (postIndex=== -1){
        return res.status(404).json({error:'Post not Dound'});
    }
    store.posts.splice(postIndex, 1);
    res.status(204).send();
};

const likePost = (req, res)=>{
    const id = parseInt(req.params.id);
    const post = store.posts.find(p=> p.id===id);

    if (!post){
     return res.status(404).json({error:'Post not Found'});   
    }
    post.likes++,
    res.json(post);
};
module.exports ={
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    likePost
};