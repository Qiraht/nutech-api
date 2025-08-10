const Joi = require('joi');

const RegisterPayloadSchema = Joi.object({
  email: Joi.string().email({ tlds: true }).required().messages({
    'string.email': 'Format email tidak sesuai',
    'string.empty': 'Parameter email harus di isi',
    'any.required': 'Parameter email harus di isi',
  }),
  first_name: Joi.string().required().messages({
    'string.empty': 'Parameter first_name harus di isi',
    'any.required': 'Parameter first_name harus di isi',
  }),
  last_name: Joi.string().required().messages({
    'string.empty': 'Parameter last_name harus di isi',
    'any.required': 'Parameter last_name harus di isi',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Parameter password harus di is',
    'string.min': 'Password length minimal 8 karakter',
    'any.required': 'Parameter password harus di is',
  }),
});

const LoginPayloadSchema = Joi.object({
  email: Joi.string().email({ tlds: true }).required().messages({
    'string.email': 'Format email tidak sesuai',
    'string.empty': 'Parameter email harus di isi',
    'any.required': 'Parameter email harus di isi',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Parameter password harus di is',
    'string.min': 'Password length minimal 8 karakter',
    'any.required': 'Parameter password harus di is',
  }),
});

const EditProfilePayloadSchema = Joi.object({
  first_name: Joi.string().required().messages({
    'string.empty': 'Parameter first_name harus di isi',
    'any.required': 'Parameter first_name harus di isi',
  }),
  last_name: Joi.string().required().required({
    'string.empty': 'Parameter last_name harus di isi',
    'any.required': 'Parameter last_name harus di isi',
  }),
});

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

module.exports = {
  RegisterPayloadSchema,
  LoginPayloadSchema,
  EditProfilePayloadSchema,
  TopUpPayloadSchema,
  TransactionSchema,
};