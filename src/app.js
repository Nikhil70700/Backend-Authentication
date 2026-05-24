const express = require('express');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api/auth', authRoutes); // Use the auth routes for authentication-related endpoints

module.exports = app;