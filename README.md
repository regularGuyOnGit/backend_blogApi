# Blog Post Api

## Overview
**Blog Post API** is a full-stack application that allows users to read and comment on blog posts, while administrators can manage the content by creating, deleting, and moderating comments. The application leverages MongoDB, Express, React, and Node.js to provide a seamless blogging experience.

## Feature

- User Authentication

### User Functionality:

- Read blog posts
- Post comments on blog entries

### Admin Functionality:

- Create, update, and delete blog posts
- Delete comments
- Manage user permissions

## Technologies Used

- Backend: Node.js, Express
- Database: MongoDB
- Frontend: React

## Installation
Follow these steps to set up the project on your local machine.

- Prerequisites
1. Node.js (v14 or later)
2. npm (v6 or later)
3. MongoDB instance (local or cloud-based)
4. Setup Instructions

- Clone the repository:

1. bash
2. Copy code :-  git clone [https://github.com/yourusername/blog-post-api.git](https://github.com/regularGuyOnGit/backend_blogApi.git)

- Navigate into the project directory:

1. bash
2. Copy code :- cd blog-post-api

- Install dependencies for the backend:

1. Go to the directory where clone is downloaded.
2. Copy code :- npm install

- Create a .env file in the server directory with the following content:
  
1. MONGO_URI=mongodb://localhost:27017/blogposts
2. PORT=5000

- Start the application:

- Start the backend server.
1. npm start

The application should now be running at http://localhost:5000 (backend).

Author: Nitin Rai
Email: nitinrai3000@gmail.com
