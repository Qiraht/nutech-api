const Joi = require('joi');

const RegisterPayloadSchema = Joi.object({
  email: Joi.string().email({ tlds: true }).required().messages({
    'string.email': 'Format email tidak sesuai',
    'string.empty': 'Silahkan isi Email',
    'any.required': 'Email wajib diisi',
  }),
  first_name: Joi.string().required().messages({
    'string.empty': 'Silahkan isi Email',
    'any.required': 'first name harus diisi',
  }),
  last_name: Joi.string().required().required({
    'string.empty': 'Silahkan isi Email',
    'any.required': 'last name harus diisi',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Silahkan isi Password',
    'string.min': 'Password kurang dari 8 karakter',
    'any.required': 'Password Diperluka',
  }),
});

const LoginPayloadSchema = Joi.object({
  email: Joi.string().email({ tlds: true }).required().messages({
    'string.email': 'Format email tidak sesuai',
    'string.empty': 'Silahkan isi Email',
    'any.required': 'Email wajib diisi',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Silahkan isi Password',
    'string.min': 'Password kurang dari 8 karakter',
    'any.required': 'Password Diperlukan',
  }),
});

const EditProfilePayloadSchema = Joi.object({
  first_name: Joi.string().required().messages({
    'string.empty': 'Silahkan isi Email',
    'any.required': 'first name harus diisi',
  }),
  last_name: Joi.string().required().required({
    'string.empty': 'Silahkan isi Email',
    'any.required': 'last name harus diisi',
  }),
});

module.exports = {
  RegisterPayloadSchema,
  LoginPayloadSchema,
  EditProfilePayloadSchema,
};
