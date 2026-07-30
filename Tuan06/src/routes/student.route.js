const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/student.controller');
const verifyToken = require('../middlewares/auth.middleware');

/**
 * Protected Student Routes
 * All endpoints in this router require JWT Authentication Middleware
 */
router.use(verifyToken);

/**
 * @route   GET /api/students
 * @desc    Get all students
 * @access  Private (JWT Required)
 */
router.get('/', StudentController.getAllStudents);

/**
 * @route   GET /api/students/:id
 * @desc    Get student details by ID
 * @access  Private (JWT Required)
 */
router.get('/:id', StudentController.getStudentById);

/**
 * @route   POST /api/students
 * @desc    Create a new student
 * @access  Private (JWT Required)
 */
router.post('/', StudentController.createStudent);

/**
 * @route   PUT /api/students/:id
 * @desc    Update student by ID
 * @access  Private (JWT Required)
 */
router.put('/:id', StudentController.updateStudent);

/**
 * @route   DELETE /api/students/:id
 * @desc    Delete student by ID
 * @access  Private (JWT Required)
 */
router.delete('/:id', StudentController.deleteStudent);

module.exports = router;
