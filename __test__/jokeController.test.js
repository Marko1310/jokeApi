const { sendJoke } = require('../controllers/jokeController');

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
});


