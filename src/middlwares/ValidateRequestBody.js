const InvariantError = require('../exceptions/InvariantError');

const validateRequestBody = (schema) => {
  return async (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
    next();
  };
};

module.exports = validateRequestBody;
