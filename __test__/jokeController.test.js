const { sendJoke } = require('../controllers/jokeController');
const userService = require('../services/userService');
const fetchJokeService = require('../services/fetchJokeService');
const nodeMailerService = require('../services/nodeMailer');

jest.mock('../services/userService');
jest.mock('../services/fetchJokeService');
jest.mock('../services/nodeMailer');

describe('sendJoke function', () => {
  it('should return a 400 error if userId is not provided in the request body', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await sendJoke(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should return a 400 error if user is not found in the database', async () => {
    const req = { userId: 123 };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const { userId } = req;
    userService.findUserById.mockResolvedValueOnce(null);

    await sendJoke(req, res);
    expect(userService.findUserById).toHaveBeenCalledWith(userId);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('User not found');
  });

  it('should send a joke if a user is found', async () => {
    const user = { userId: 123, email: 'test@test.com' };
    const req = { userId: user.userId };
    const res = {
      json: jest.fn(),
    };
    const fetchJokeResponse = {
      data: {
        value: 'Some random joke',
      },
    };

    userService.findUserById.mockResolvedValueOnce(user);
    fetchJokeService.fetchJoke.mockResolvedValueOnce(fetchJokeResponse);

    await sendJoke(req, res);
    expect(userService.findUserById).toHaveBeenCalledWith(user.userId);
    expect(nodeMailerService.sendJokeMail).toHaveBeenCalledWith(user.email, fetchJokeResponse.data.value);
    expect(fetchJokeService.fetchJoke).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(fetchJokeResponse.data.value);
  });
});
