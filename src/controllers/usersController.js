//const { nextId } = require("../data/store");

let users = [
    {id:1, name: "John Doe", email: "john@example.com"},
    {id:2, name: "jane Smith", email: "jane@example.com"}
];

let nextId = 3;
const getAllUsers = (req, res)=>{
    res.json(users);
};
const getUserById =(req, res)=>{
    const id =parseInt(req.params.id);
    const user = users.find(u=> u.id === id);

    if (!user){
        return res.status(404).json({error: 'User not Found'});

    }
    res.json(user);
};
const createUser = (req, res)=>{
    const {name, email} = req.body;
    if (!name || !email){
        return res.status(400).json({error: 'Name and Email are required'});
    }
    if (!email.includes('@')){
        return res.status(400).json({error:'Invalid email fromat'});

    }
    const newUser = {
        id: nextId++,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
};

module.exports = {getAllUsers, getUserById, createUser};