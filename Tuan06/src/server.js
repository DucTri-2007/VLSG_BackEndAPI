const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

// Start Server
const startServer = async () => {
  // Connect to Database (with fallback)
  await connectDB();

  app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 Student Management Server running on port ${PORT}`);
    console.log(`🌐 Base URL: http://localhost:${PORT}`);
    console.log(`🔑 Login Endpoint: POST http://localhost:${PORT}/api/auth/login`);
    console.log(`🎓 Student Endpoints: http://localhost:${PORT}/api/students`);
    console.log(`==================================================`);
  });
};

startServer();
