class ClientError extends Error {
  constructor(errorCode, message, statusCode = 400, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.data = data;
    this.name = 'ClientError';
  }
}

module.exports = ClientError;
