const httpStatus = require('http-status');
const { catchAsync } = require('../middlewares/error.middleware');
const studentService = require('../services/student.service');
const ApiResponse = require('../utils/ApiResponse');

/**
 * Handle POST /students request
 */
const createStudent = catchAsync(async (req, res) => {
  const student = await studentService.createStudent(req.body);
  res
    .status(httpStatus.CREATED)
    .send(new ApiResponse(httpStatus.CREATED, student, 'Student created successfully'));
});

/**
 * Handle GET /students request with filters and pagination
 */
const getStudents = catchAsync(async (req, res) => {
  const { search, classCode, sortBy, limit, page } = req.query;
  const options = { search, classCode, sortBy, limit, page };
  const filter = {};
  const result = await studentService.queryStudents(filter, options);
  res
    .status(httpStatus.OK)
    .send(new ApiResponse(httpStatus.OK, result, 'Students retrieved successfully'));
});

/**
 * Handle GET /students/:id request
 */
const getStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudentById(req.params.id);
  res
    .status(httpStatus.OK)
    .send(new ApiResponse(httpStatus.OK, student, 'Student details retrieved successfully'));
});

/**
 * Handle PUT /students/:id request
 */
const updateStudent = catchAsync(async (req, res) => {
  const student = await studentService.updateStudentById(req.params.id, req.body);
  res
    .status(httpStatus.OK)
    .send(new ApiResponse(httpStatus.OK, student, 'Student updated successfully'));
});

/**
 * Handle DELETE /students/:id request
 */
const deleteStudent = catchAsync(async (req, res) => {
  await studentService.deleteStudentById(req.params.id);
  res
    .status(httpStatus.OK)
    .send(new ApiResponse(httpStatus.OK, null, 'Student deleted successfully'));
});

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
