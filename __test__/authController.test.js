const { signup } = require('../controllers/authController');
const userService = require('../services/userService');
const maxAge = 60 * 60 * 24;

jest.mock('../services/userService');

describe('authController', () => {
  it('should return a 400 error if firstName is not valid', async () => {
    const req = {
      body: {
        firstName: '',
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
    };

    await signup(req, res);
    expect(userService.newUser).toHaveBeenCalledWith(firstName, lastName, email, password);
  });
});
