const { StudentModel } = require('../models/student.model');

class StudentService {
  /**
   * Get all students
   * @returns {Promise<Array>} List of students
   */
  static async getAllStudents() {
    return await StudentModel.find();
  }

  /**
   * Get student details by ID
   * @param {string} id - Student ID
   * @returns {Promise<Object>} Student object
   */
  static async getStudentById(id) {
    const student = await StudentModel.findById(id);
    if (!student) {
      const error = new Error(`Student with ID '${id}' not found.`);
      error.statusCode = 404;
      throw error;
    }
    return student;
  }

  /**
   * Create a new student with business validation
   * @param {Object} studentData - Student data payload
   * @returns {Promise<Object>} Created student
   */
  static async createStudent(studentData) {
    const { studentCode, fullName, email, dateOfBirth, major, gpa, gender } = studentData;

    // Validation 1: Required fields
    if (!studentCode || !fullName || !email || !dateOfBirth || !major) {
      const error = new Error('Missing required fields: studentCode, fullName, email, dateOfBirth, major are mandatory.');
      error.statusCode = 400;
      throw error;
    }

    // Validation 2: Check for existing studentCode
    const existingCode = await StudentModel.findOne({ studentCode });
    if (existingCode) {
      const error = new Error(`Student code '${studentCode}' already exists in system.`);
      error.statusCode = 400;
      throw error;
    }

    // Validation 3: Check for existing email
    const existingEmail = await StudentModel.findOne({ email });
    if (existingEmail) {
      const error = new Error(`Email '${email}' is already registered.`);
      error.statusCode = 400;
      throw error;
    }

    // Validation 4: GPA range (0.0 to 4.0)
    if (gpa !== undefined && (typeof gpa !== 'number' || gpa < 0 || gpa > 4.0)) {
      const error = new Error('GPA must be a number between 0.0 and 4.0.');
      error.statusCode = 400;
      throw error;
    }

    return await StudentModel.create({
      studentCode,
      fullName,
      email,
      dateOfBirth,
      gender: gender || 'Male',
      major,
      gpa: gpa !== undefined ? gpa : 0.0
    });
  }

  /**
   * Update student information by ID
   * @param {string} id - Student ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated student
   */
  static async updateStudent(id, updateData) {
    // Check if student exists
    await this.getStudentById(id);

    // If studentCode is being updated, check uniqueness
    if (updateData.studentCode) {
      const existingCode = await StudentModel.findOne({ studentCode: updateData.studentCode });
      if (existingCode && existingCode.id !== id && existingCode._id?.toString() !== id) {
        const error = new Error(`Student code '${updateData.studentCode}' is taken by another student.`);
        error.statusCode = 400;
        throw error;
      }
    }

    // If email is being updated, check uniqueness
    if (updateData.email) {
      const existingEmail = await StudentModel.findOne({ email: updateData.email });
      if (existingEmail && existingEmail.id !== id && existingEmail._id?.toString() !== id) {
        const error = new Error(`Email '${updateData.email}' is taken by another student.`);
        error.statusCode = 400;
        throw error;
      }
    }

    // Validate GPA if present
    if (updateData.gpa !== undefined && (typeof updateData.gpa !== 'number' || updateData.gpa < 0 || updateData.gpa > 4.0)) {
      const error = new Error('GPA must be a number between 0.0 and 4.0.');
      error.statusCode = 400;
      throw error;
    }

    const updatedStudent = await StudentModel.findByIdAndUpdate(id, updateData);
    return updatedStudent;
  }

  /**
   * Delete student by ID
   * @param {string} id - Student ID
   * @returns {Promise<Object>} Deleted student
   */
  static async deleteStudent(id) {
    // Check if student exists
    await this.getStudentById(id);

    const deletedStudent = await StudentModel.findByIdAndDelete(id);
    return deletedStudent;
  }
}

module.exports = StudentService;
