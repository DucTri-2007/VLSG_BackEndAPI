const jwt = require('jsonwebtoken');

/**
 * JWT Authentication Middleware
 * Protects routes by validating Bearer JWT Tokens
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided in Authorization header (Expected format: Bearer <token>).'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secretKey = process.env.JWT_SECRET || 'super_secret_jwt_key_student_management_2026';
    const decoded = jwt.verify(token, secretKey);

    // Attach decoded user payload to request object
    req.user = decoded;
    next();
  } catch (error) {
    let message = 'Unauthorized: Invalid token.';
    if (error.name === 'TokenExpiredError') {
      message = 'Unauthorized: Token has expired. Please login again.';
    }

    return res.status(401).json({
      success: false,
      message: message,
      error: error.message
    });
  }
};

module.exports = verifyToken;
