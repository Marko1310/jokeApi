const { requireAuth } = require('../middleware/authMiddleware');

const { verifyToken } = require('../services/jwtService');

jest.mock('../services/jwtService');

describe('requireAuth middleware', () => {
  it('requireAuth should send a 400 status code and "You are not authorized" message when token is null', async () => {
    const token = null;

    const req = {
      cookies: {
        jwt: token,
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
    const next = jest.fn();
    await requireAuth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('You are not authorized');
    expect(next).not.toHaveBeenCalled();
  });

  it('should call the next function when a valid token is provided', async () => {
    const req = {
      cookies: {
        jwt: 'valid-token',
      },
    };

    const decodedToken = {
      userId: '123',
      name: 'John Doe',
      iat: 1516239022,
    };
    verifyToken.mockReturnValue(decodedToken);

    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
    const next = jest.fn();

    await requireAuth(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalledWith(400);
    expect(res.json).not.toHaveBeenCalledWith('You are not authorized');
  });
});
