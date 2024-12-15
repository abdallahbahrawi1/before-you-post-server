import Joi from 'joi';

export const signupSchema = Joi.object({
  fullName: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'First name is required.',
    'string.min': 'First name must be at least 2 characters long.',
    'string.max': 'First name must be less than 50 characters long.',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 8 characters long.',
  }),
  termsAccepted: Joi.boolean().valid(true).required().messages({
    'any.required': 'You must agree to the terms and conditions.',
    'any.only': 'You must agree to the terms and conditions.',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 8 characters long.',
  }),
});