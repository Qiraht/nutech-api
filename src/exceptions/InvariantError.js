const ClientError = require('./ClientError');

class InvariantError extends ClientError {
  constructor(message) {
    super(102, message);
    this.name = 'Invariant Error';
  }
}

module.exports = InvariantError;
