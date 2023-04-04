const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.JOKEDB_DATABASE,
  process.env.JOKEDB_USERNAME,
  process.env.JOKEDB_PASSWORD,
  {
    host: process.env.JOKEDB_HOST,
    port: process.env.JOKEDB_PORT,
    dialect: 'postgres',
  },
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
