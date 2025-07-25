const ClientError = require('./ClientError');

class AuthenticationError extends ClientError {
  constructor(message) {
    super(102, message);
    this.name = 'Authentication Error';
  }
}

module.exports = AuthenticationError;
