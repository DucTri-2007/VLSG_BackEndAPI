const Joi = require('joi');

/**
 * Custom Joi validator helper for MongoDB ObjectId
 */
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const createStudent = {
  body: Joi.object().keys({
    studentId: Joi.string().required().trim(),
    fullName: Joi.string().required().trim(),
    email: Joi.string().required().email().lowercase().trim(),
    phone: Joi.string().allow(null, '').trim(),
    dateOfBirth: Joi.date().iso().allow(null),
    gender: Joi.string().valid('male', 'female', 'other'),
    classCode: Joi.string().required().trim(),
    gpa: Joi.number().min(0).max(10).default(0),
  }),
};

const getStudents = {
  query: Joi.object().keys({
    search: Joi.string().allow(''),
    classCode: Joi.string().allow(''),
    sortBy: Joi.string().allow(''),
    limit: Joi.number().integer().min(1).max(100).default(10),
    page: Joi.number().integer().min(1).default(1),
  }),
};

const getStudent = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const updateStudent = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      studentId: Joi.string().trim(),
      fullName: Joi.string().trim(),
      email: Joi.string().email().lowercase().trim(),
      phone: Joi.string().allow(null, '').trim(),
      dateOfBirth: Joi.date().iso().allow(null),
      gender: Joi.string().valid('male', 'female', 'other'),
      classCode: Joi.string().trim(),
      gpa: Joi.number().min(0).max(10),
    })
    .min(1), // require at least one field to be updated
};

const deleteStudent = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
