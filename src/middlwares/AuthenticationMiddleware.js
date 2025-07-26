const TokenError = require('../exceptions/TokenError');
const TokenManager = require('../utils/tokenManager');

const authenticationMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    throw new TokenError('Token tidak valid atau kadaluarsa');
  }
  try {
    await TokenManager.verifyToken(token);
    const user = await TokenManager.decodeToken(token);

    req.user = user;
    next();
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    throw new TokenError('Token tidak valid atau kadaluarsa');
  }
};

module.exports = authenticationMiddleware;
