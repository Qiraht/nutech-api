const Joi = require('joi');

const TopUpPayloadSchema = Joi.object({
  top_up_amount: Joi.number().greater(0).messages({
    'number.base':
      'Parameter top_up_amount hanya boleh angka dan tidak boleh lebih kecil dari 0',
    'any.required':
      'Parameter top_up_amount hanya boleh angka dan tidak boleh lebih kecil dari 0',
    'number.greater':
      'Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0',
  }),
});

module.exports = { TopUpPayloadSchema };
