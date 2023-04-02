// Import dependencies
const express = require('express');

const cors = require('express');

const cookieParser = require('cookie-parser');

// Create Express app instances
const app = express();

// Setup middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Export app instance
module.exports = app;
