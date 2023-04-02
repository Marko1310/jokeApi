// Import depemdencies
const http = require('http');

const app = require('./app');

// Setup server
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
