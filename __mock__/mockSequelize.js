const SequelizeMock = require('sequelize-mock');

const sequelizeMock = new SequelizeMock();

const UserMock = sequelizeMock.define('User', {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: 'password',
});

module.exports = { sequelizeMock, UserMock };
