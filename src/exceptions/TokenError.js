const ClientError = require('./ClientError');

class TokenError extends ClientError {
  constructor(message) {
    super(108, message, 401);
    this.name = 'TokenError';
  }
}

module.exports = TokenError;
