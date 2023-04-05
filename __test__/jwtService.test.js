const jwt = require('jsonwebtoken');
const { createToken, verifyToken } = require('../services/jwtService');

jest.mock('jsonwebtoken');

describe('createToken', () => {
  it('calls jwt.sign with correct parameters', () => {
    const userId = '123';
    const maxAge = 3600;
    const expectedToken = 'generated-token';

    jwt.sign.mockReturnValue(expectedToken);

    const token = createToken(userId, maxAge);

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: maxAge },
    );
    expect(token).toBe(expectedToken);
  });

  it('throws an error for expired token', () => {
    const expiredToken = 'someRandomToken';
    const secret = 'mysecret';

    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid or expired token');
    });

    expect(() => verifyToken(expiredToken, secret)).toThrow('Invalid or expired token');
  });
});
