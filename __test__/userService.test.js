const User = require('../models/user');

const { newUser, findUserById, findUserByEmail } = require('../services/userService');

test('newUser should call User.create with the correct parameters', async () => {
  const mockCreate = jest.fn();
  User.create = mockCreate;

  await newUser('John', 'Doe', 'john.doe@example.com', 'password');

  expect(mockCreate).toHaveBeenCalledTimes(1);
  expect(mockCreate).toHaveBeenCalledWith({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password',
  });
});

test('findUserById should call User.findOne with the correct parameters', async () => {
  const mockCreate = jest.fn();
  User.findOne = mockCreate;

  const userId = 1;
  await findUserById(userId);

  expect(mockCreate).toHaveBeenCalledTimes(1);
  expect(mockCreate).toHaveBeenCalledWith({ where: { userId } });
});

test('findUserByEmail should call User.findOne with the correct parameters', async () => {
  const mockCreate = jest.fn();
  User.findOne = mockCreate;

  const email = 'test@test.com';
  await findUserByEmail(email);

  expect(mockCreate).toHaveBeenCalledTimes(1);
  expect(mockCreate).toHaveBeenCalledWith({ where: { email } });
});
