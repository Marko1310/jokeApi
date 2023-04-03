// Import depemdencies
const app = require('./app');

// Setup server
const PORT = process.env.PORT || 8000;

// Import databases
const db = require('./models/user');

// Start server
db.sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error syncing database:', error);
  });
