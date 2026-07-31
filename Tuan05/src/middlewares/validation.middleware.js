const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/**
 * Middleware validation generator using Joi
 * @param {Object} schema - Joi schema defining rules for req.body, req.query, or req.params
 */
const validate = (schema) => (req, res, next) => {
  const validKeys = ['params', 'query', 'body'];
  const object = {};

  validKeys.forEach((key) => {
    if (schema[key]) {
      object[key] = req[key];
    }
  });

  const { value, error } = Joi.compile(schema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  // Assign normalized/validated values back to req object
  Object.assign(req, value);
  return next();
};

module.exports = validate;
