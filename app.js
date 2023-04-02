// Import dependencies
const express = require('express');
const cors = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

// Create Express app instances
const app = express();

// Setup middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api', authRoutes);

// Export app instance
module.exports = app;
