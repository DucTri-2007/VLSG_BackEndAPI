const StudentService = require('../services/student.service');

class StudentController {
  /**
   * GET /api/students
   * Fetch list of all students
   */
  static async getAllStudents(req, res) {
    try {
      const students = await StudentService.getAllStudents();
      return res.status(200).json({
        success: true,
        total: students.length,
        data: students
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Error fetching student list.'
      });
    }
  }

  /**
   * GET /api/students/:id
   * Fetch single student details by ID
   */
  static async getStudentById(req, res) {
    try {
      const { id } = req.params;
      const student = await StudentService.getStudentById(id);
      return res.status(200).json({
        success: true,
        data: student
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Error fetching student details.'
      });
    }
  }

  /**
   * POST /api/students
   * Create a new student
   */
  static async createStudent(req, res) {
    try {
      const newStudent = await StudentService.createStudent(req.body);
      return res.status(201).json({
        success: true,
        message: 'Student created successfully.',
        data: newStudent
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Error creating student.'
      });
    }
  }

  /**
   * PUT /api/students/:id
   * Update existing student by ID
   */
  static async updateStudent(req, res) {
    try {
      const { id } = req.params;
      const updatedStudent = await StudentService.updateStudent(id, req.body);
      return res.status(200).json({
        success: true,
        message: `Student '${id}' updated successfully.`,
        data: updatedStudent
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Error updating student.'
      });
    }
  }

  /**
   * DELETE /api/students/:id
   * Delete student by ID
   */
  static async deleteStudent(req, res) {
    try {
      const { id } = req.params;
      const deletedStudent = await StudentService.deleteStudent(id);
      return res.status(200).json({
        success: true,
        message: `Student '${id}' deleted successfully.`,
        data: deletedStudent
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Error deleting student.'
      });
    }
  }
}

module.exports = StudentController;
