const mongoose = require('mongoose');

/**
 * Mongoose Schema definition for Student
 */
const studentSchema = new mongoose.Schema(
  {
    studentCode: {
      type: String,
      required: [true, 'Student code is required'],
      unique: true,
      trim: true,
      uppercase: true
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required']
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Male'
    },
    major: {
      type: String,
      required: [true, 'Major is required'],
      trim: true
    },
    gpa: {
      type: Number,
      min: [0.0, 'GPA cannot be less than 0.0'],
      max: [4.0, 'GPA cannot exceed 4.0'],
      default: 0.0
    }
  },
  {
    timestamps: true
  }
);

const MongooseStudentModel = mongoose.model('Student', studentSchema);

/**
 * Mock Data Repository (Fallback when MongoDB is disconnected)
 */
let mockStudents = [
  {
    id: '1',
    studentCode: 'SV001',
    fullName: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
    dateOfBirth: '2002-05-15',
    gender: 'Male',
    major: 'Computer Science',
    gpa: 3.6,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: '2',
    studentCode: 'SV002',
    fullName: 'Tran Thi B',
    email: 'tranthib@example.com',
    dateOfBirth: '2003-08-20',
    gender: 'Female',
    major: 'Information Technology',
    gpa: 3.8,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01')
  },
  {
    id: '3',
    studentCode: 'SV003',
    fullName: 'Le Van C',
    email: 'levanc@example.com',
    dateOfBirth: '2002-11-10',
    gender: 'Male',
    major: 'Software Engineering',
    gpa: 3.2,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01')
  }
];

/**
 * Student Data Access Object (Model Adapter)
 * Automatically switches between Mongoose MongoDB operations and Mock Data Store
 */
class StudentModel {
  static isMongoConnected() {
    return mongoose.connection.readyState === 1;
  }

  static async find() {
    if (this.isMongoConnected()) {
      return await MongooseStudentModel.find().lean();
    }
    return mockStudents;
  }

  static async findById(id) {
    if (this.isMongoConnected()) {
      return await MongooseStudentModel.findById(id).lean();
    }
    return mockStudents.find((s) => s.id === id || s._id === id) || null;
  }

  static async findOne(query) {
    if (this.isMongoConnected()) {
      return await MongooseStudentModel.findOne(query).lean();
    }
    return mockStudents.find((s) => {
      if (query.studentCode && s.studentCode.toUpperCase() === query.studentCode.toUpperCase()) return true;
      if (query.email && s.email.toLowerCase() === query.email.toLowerCase()) return true;
      return false;
    }) || null;
  }

  static async create(studentData) {
    if (this.isMongoConnected()) {
      const newDoc = await MongooseStudentModel.create(studentData);
      return newDoc.toObject();
    }
    const newStudent = {
      id: String(Date.now()),
      studentCode: studentData.studentCode.toUpperCase(),
      fullName: studentData.fullName,
      email: studentData.email.toLowerCase(),
      dateOfBirth: studentData.dateOfBirth,
      gender: studentData.gender || 'Male',
      major: studentData.major,
      gpa: Number(studentData.gpa) || 0.0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockStudents.push(newStudent);
    return newStudent;
  }

  static async findByIdAndUpdate(id, updateData) {
    if (this.isMongoConnected()) {
      return await MongooseStudentModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).lean();
    }
    const index = mockStudents.findIndex((s) => s.id === id || s._id === id);
    if (index === -1) return null;

    mockStudents[index] = {
      ...mockStudents[index],
      ...updateData,
      updatedAt: new Date()
    };
    return mockStudents[index];
  }

  static async findByIdAndDelete(id) {
    if (this.isMongoConnected()) {
      return await MongooseStudentModel.findByIdAndDelete(id).lean();
    }
    const index = mockStudents.findIndex((s) => s.id === id || s._id === id);
    if (index === -1) return null;

    const deleted = mockStudents[index];
    mockStudents.splice(index, 1);
    return deleted;
  }
}

module.exports = {
  StudentModel,
  MongooseStudentModel,
  studentSchema
};
