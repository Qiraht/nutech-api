const jwt = require('jsonwebtoken');
const config = require('../config');

const TokenManager = {
  // Generate token for auth
  generateToken: (payload) =>
    jwt.sign({ payload }, config.token.secretToken, {
      expiresIn: config.token.tokenAge,
    }),
  // verify token for security
  verifyToken: (token) => jwt.verify(token, config.token.secretToken),
  // decode token data
  decodeToken: (token) => jwt.decode(token),
};

module.exports = TokenManager;
