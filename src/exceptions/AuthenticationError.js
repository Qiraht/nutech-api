const ClientError = require('./ClientError');

class AuthenticationError extends ClientError {
  constructor(message) {
    super(102, message, 401);
    this.name = 'AuthenticationError';
  }
}

module.exports = AuthenticationError;
