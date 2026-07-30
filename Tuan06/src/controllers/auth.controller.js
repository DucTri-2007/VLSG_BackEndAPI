const jwt = require('jsonwebtoken');

class AuthController {
  /**
   * Public endpoint to authenticate and receive JWT token
   * POST /api/auth/login
   */
  static login(req, res) {
    try {
      const { username, password } = req.body;

      // Mock authentication logic (Accepts admin/admin123 or default guest)
      const validUsername = username || 'admin';
      const validPassword = password || 'admin123';

      if (username && password && (username !== 'admin' || password !== 'admin123')) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Default testing account is username: admin, password: admin123'
        });
      }

      const payload = {
        userId: 'user_101',
        username: validUsername,
        role: 'Administrator'
      };

      const secretKey = process.env.JWT_SECRET || 'super_secret_jwt_key_student_management_2026';
      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

      return res.status(200).json({
        success: true,
        message: 'Authentication successful. Use this token in Authorization: Bearer <token>',
        token: token,
        expiresIn: '1h',
        user: payload
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error during authentication.',
        error: error.message
      });
    }
  }
}

module.exports = AuthController;
