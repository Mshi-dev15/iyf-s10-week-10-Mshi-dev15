# Week 10: Backend Basics - Node.js & Express

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

## Author
- **Name:** Mshi
- **GitHub:** [@Mshi-dev15](https://github.com/Mshi-dev15)
- **Date:** April 23, 2026

---
 
## Features
✅ **Posts API** (`/api/posts`)
- GET all posts with filtering (`?author=`, `?sort=newest|popular`)
- GET single post by ID
- POST create new post (with validation)
- PUT update post
- PATCH like a post (`/api/posts/:id/like`)
- DELETE post

✅ **Users API** (`/api/users`)
- GET all users
- GET user by ID
- POST create new user (with validation)

✅ **Middleware**
- Logger: logs timestamp, method, and URL for every request
- Validation: ensures required fields and minimum lengths
- Error Handler: centralized 4xx/5xx error responses
- CORS: allows cross-origin requests from frontend apps

✅ **Environment Variables**
- Configurable PORT via `.env`
- NODE_ENV for development/production modes

✅ **Health Check**
- `GET /api/health` returns status and timestamp

---

## Project Description
Built a RESTful backend API using Node.js and Express for the CommunityHub platform. The API handles posts, users, and comments with full CRUD operations, middleware, validation, and error handling. The project is organized using a modular folder structure with separate routes, controllers, and middleware.

---

## Technologies Used
- Node.js
- Express.js
- dotenv
- Thunder Client (API testing)

---

## How to Run
1. Clone this repository
2. Navigate to the project folder
3. Install dependencies:
4. Create a `.env` file based on `.env.example`
5. Start the server:
6. Visit `http://localhost:3000/api/posts` in your browser

---

## Lessons Learned
- How Node.js runs JavaScript outside the browser
- How Express handles routes and middleware
- The difference between route parameters and query strings
- How CRUD operations map to HTTP methods (GET, POST, PUT, DELETE, PATCH)
- How middleware works as a pipeline between request and response
- How to organize code into routes, controllers, and middleware
- How environment variables keep sensitive data secure

---

## Challenges Faced
- Fixed double-nested folder structure at the start of the project
- Resolved variable name typos that caused ReferenceErrors
- Fixed 404 handler placement — it must always be last
- Debugged dotenv version incompatibility (downgraded to v16)
- Learned that Git Bash on Windows shows a new prompt even when the server is still running