const express = require('express');
const path = require('path');
const connectDB = require('./db');
const corsConfig = require('./corsConfig');

const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');

const app = express();

// Connect to MongoDB
connectDB();

// CORS Middleware
app.use(corsConfig);

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;