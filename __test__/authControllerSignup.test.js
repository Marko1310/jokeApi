const { signup } = require('../controllers/authController');
const userService = require('../services/userService');
const jwtService = require('../services/jwtService');

jest.mock('../services/userService');
jest.mock('../services/jwtService');
jest.mock('bcryptjs');

describe('authController', () => {
  it('should return a 400 error if userService.newUser throws an error', async () => {
    const req = {
      body: {
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.com',
        password: 'testPassword',
      },
    };

    const {
      firstName, lastName, email, password,
    } = req.body;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };

    const mockError = new Error('New user error');
    userService.newUser = jest.fn(() => {
      throw mockError;
    });

    await signup(req, res);
    expect(userService.newUser).toHaveBeenCalledWith(firstName, lastName, email, password);
    expect(jwtService.createToken).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.cookie).not.toHaveBeenCalled();
  });

  it('should call createToken function, attach a cookie to res and give a res.status 200 if a user is returned from userService.newUser function', async () => {
    const maxAge = 60 * 60 * 24;

    const req = {
      body: {
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.com',
        password: 'testPassword',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };

    const mockUser = {
      userId: 1, firstName: 'test', lastName: 'test', email: 'test@test.com',
    };
    userService.newUser = jest.fn().mockResolvedValue(mockUser);

    const mockToken = 'some random token';
    jwtService.createToken = jest.fn(() => mockToken);

    await signup(req, res);
    expect(userService.newUser).toHaveBeenCalledWith(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
    );

    expect(jwtService.createToken).toHaveBeenCalledWith(mockUser.userId, maxAge);
    expect(res.cookie).toHaveBeenCalledWith('jwt', mockToken, { httpOnly: true, maxAge: maxAge * 1000 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ userId: mockUser.userId });
  });
});
