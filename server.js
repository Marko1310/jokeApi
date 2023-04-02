// Import depemdencies
const http = require('http');

const app = require('./app');

// Setup server
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

// Import databases
const db = require('./models/users');

// Start server
db.sequelize
  .sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error syncing database:', error);
  });

// Test sever
app.get('/', (req, res) => {
  res
    .status(200)
    .json('Hello from the server')
    .catch((err) => {
      console.log(err);
      res.status(500).json('Internal server error');
    });
});

// Test connection to database
app.get('/testdb', (req, res) => {
  res
    .status(200)
    .json('Connection succesfull to the database')
    .catch((err) => console.log(err));
});
