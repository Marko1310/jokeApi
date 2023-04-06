const bcrypt = require('bcryptjs');

const { login } = require('../controllers/authController');
const userService = require('../services/userService');
const jwtService = require('../services/jwtService');

jest.mock('../services/userService');
jest.mock('../services/jwtService');
jest.mock('bcryptjs');

describe('authController', () => {
  it('should return a 400 error if user is not found in the db and bcrypt.compare should not be called', async () => {
    const req = {
      body: {
        email: 'test@test.com',
        password: 'testPassword',
      },
    };

    const {
      email,
    } = req.body;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };

    const mockError = new Error('User cannot be found');
    userService.findUserByEmail = jest.fn(() => {
      throw mockError;
    });

    await login(req, res);
    expect(userService.findUserByEmail).toHaveBeenCalledWith(email);
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.cookie).not.toHaveBeenCalled();
  });

  it('should call bcrypt.compare if user is found in the db and ', async () => {
    const req = {
      body: {
        email: 'test@test.com',
        password: 'testPassword',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };

    const user = { userId: 123, email: 'test@test.com' };
    userService.findUserByEmail = jest.fn(() => user);

    await login(req, res);
    expect(bcrypt.compare).toHaveBeenCalled();
  });

  it('should return a 400 error if auth fails', async () => {
    const req = {
      body: {
        email: 'test@test.com',
        password: 'testPassword',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
    bcrypt.compare = jest.fn(() => false);

    await login(req, res);
    expect(jwtService.createToken).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.cookie).not.toHaveBeenCalled();
  });

  it('should call createToken, res.cookies and res.json(200) if auth is valid', async () => {
    const maxAge = 60 * 60 * 24;

    const req = {
      body: {
        email: 'test@test.com',
        password: 'testPassword',
      },
    };

    const user = { userId: 123, email: 'test@test.com' };
    userService.findUserByEmail = jest.fn(() => user);

    const mockToken = 'some random token';
    jwtService.createToken = jest.fn(() => mockToken);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
    bcrypt.compare = jest.fn(() => true);

    await login(req, res);
    expect(jwtService.createToken).toHaveBeenCalledWith(user.userId, maxAge);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.cookie).toHaveBeenCalledWith('jwt', mockToken, { httpOnly: true, maxAge: maxAge * 1000 });
  });
});
