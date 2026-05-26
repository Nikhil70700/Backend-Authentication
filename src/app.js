const express = require('express');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

app.use('/api/auth', authRoutes); // Use the auth routes for authentication-related endpoints
app.use("/api/posts",postRoutes); // Use the post routes for post-related endpoints

module.exports = app;