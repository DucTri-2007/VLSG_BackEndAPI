const express = require('express');
const validate = require('../middlewares/validation.middleware');
const studentValidation = require('../validations/student.validation');
const studentController = require('../controllers/student.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(studentValidation.createStudent), studentController.createStudent)
  .get(validate(studentValidation.getStudents), studentController.getStudents);

router
  .route('/:id')
  .get(validate(studentValidation.getStudent), studentController.getStudent)
  .put(validate(studentValidation.updateStudent), studentController.updateStudent)
  .delete(validate(studentValidation.deleteStudent), studentController.deleteStudent);

module.exports = router;
