// Enviorment variables
require('dotenv').config({ path: './config/general/.env' });

// Import dependencies
const express = require('express');
const cors = require('express');
const cookieParser = require('cookie-parser');

// routes
const authRoutes = require('./routes/authRoutes');
const jokeRoute = require('./routes/jokeRoute');
const testRoute = require('./routes/testRoute');

// Create Express app instances
const app = express();

// Setup middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api', authRoutes);
app.use('/api', jokeRoute);

// Test server
app.use('/', testRoute);

// Export app instance
module.exports = app;
