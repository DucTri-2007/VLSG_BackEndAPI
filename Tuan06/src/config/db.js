const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/student_management_db', {
      serverSelectionTimeoutMS: 2000 // Short timeout to gracefully fall back if local MongoDB is not running
    });
    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database] MongoDB Connection Warning: ${error.message}`);
    console.warn(`[Database] System will operate with standard Schema structure / In-Memory Store fallback for instant testing.`);
    return false;
  }
};

module.exports = connectDB;
