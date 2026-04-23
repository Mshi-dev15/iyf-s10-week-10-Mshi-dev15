console.log("Hello from Node.js!");

console.log("Node version:", process.version)
console.log("Current directory:", process.cwd());
console.log("Platform:", process.platform);

console.log("Arguments:",process.argv);

const fs =require('fs');
const content =fs.readFileSync('hello.js', 'utf-8');
console.log(content);

fs.writeFileSync('output.txt', 'hello, world!');

const path = require('path');
console.log(path.join(__dirname, 'files','data.json'));
console.log(path.extname('photo.jpg'));