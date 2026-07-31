const httpStatus = require('http-status');
const Student = require('../models/student.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a new student
 * @param {Object} studentBody
 * @returns {Promise<Student>}
 */
const createStudent = async (studentBody) => {
  if (await Student.findOne({ studentId: studentBody.studentId })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student ID already exists');
  }
  if (await Student.findOne({ email: studentBody.email })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
  }
  return Student.create(studentBody);
};

/**
 * Query students with sorting, pagination, and filters
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Object>}
 */
const queryStudents = async (filter, options) => {
  const { limit = 10, page = 1, sortBy, search, classCode } = options;
  const query = { ...filter };

  if (classCode) {
    query.classCode = classCode;
  }

  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { studentId: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  let sort = '';
  if (sortBy) {
    const parts = sortBy.split(',');
    sort = parts
      .map((part) => {
        const [key, order] = part.split(':');
        return (order === 'desc' ? '-' : '') + key;
      })
      .join(' ');
  } else {
    sort = 'createdAt';
  }

  const limitNum = parseInt(limit, 10);
  const pageNum = parseInt(page, 10);
  const skip = (pageNum - 1) * limitNum;

  const countPromise = Student.countDocuments(query);
  const docsPromise = Student.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limitNum)
    .exec();

  const [totalResults, results] = await Promise.all([countPromise, docsPromise]);
  const totalPages = Math.ceil(totalResults / limitNum);

  return {
    results,
    page: pageNum,
    limit: limitNum,
    totalPages,
    totalResults,
  };
};

/**
 * Get student by database ID
 * @param {ObjectId} id
 * @returns {Promise<Student>}
 */
const getStudentById = async (id) => {
  const student = await Student.findById(id);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  return student;
};

/**
 * Update student by database ID
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Student>}
 */
const updateStudentById = async (id, updateBody) => {
  const student = await getStudentById(id);

  if (updateBody.studentId && updateBody.studentId !== student.studentId) {
    if (await Student.findOne({ studentId: updateBody.studentId })) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Student ID already exists');
    }
  }

  if (updateBody.email && updateBody.email !== student.email) {
    if (await Student.findOne({ email: updateBody.email })) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
    }
  }

  Object.assign(student, updateBody);
  await student.save();
  return student;
};

/**
 * Delete student by database ID
 * @param {ObjectId} id
 * @returns {Promise<Student>}
 */
const deleteStudentById = async (id) => {
  const student = await getStudentById(id);
  await student.deleteOne();
  return student;
};

module.exports = {
  createStudent,
  queryStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
