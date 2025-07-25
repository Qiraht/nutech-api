const ClientError = require('../exceptions/ClientError');

// eslint-disable-next-line no-unused-vars
const ErrorHandler = (err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      status: err.errorCode,
      message: err.message,
      data: err.data,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    data: null,
  });
};

module.exports = ErrorHandler;
