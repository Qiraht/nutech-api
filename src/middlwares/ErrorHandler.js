const ClientError = require("../exceptions/ClientError")

const ErrorHandler = (err, res, req, next) => {
    if (err instanceof ClientError) {
        return res.status(err.statusCode).json({
            status: 'fail',
            message: err.message,
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
};

module.exports = ErrorHandler;