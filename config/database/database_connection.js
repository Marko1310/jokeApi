const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
  }
);

// test connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection succesfull!');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
