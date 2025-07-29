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

const TransactionSchema = Joi.object({
  service_code: Joi.string().required().messages({
    'any.required': 'Parameter service_code harus di isi',
    'string.empty': 'Parameter service_code harus di isi',
  }),
});

module.exports = { TopUpPayloadSchema, TransactionSchema };
