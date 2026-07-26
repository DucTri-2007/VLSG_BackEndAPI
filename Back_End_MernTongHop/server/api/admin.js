const express = require('express');
const router = express.Router();

// utils
const JwtUtil = require('../utils/JwtUtil');

// daos
const AdminDAO = require('../models/AdminDAO');

// POST /login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    try {
      const admin = await AdminDAO.selectByUsernameAndPassword(username, password);
      if (admin) {
        const token = JwtUtil.genToken(username, password);
        return res.json({ success: true, message: 'Authentication successful', token: token, admin: admin });
      } else {
        return res.json({ success: false, message: 'Incorrect username or password' });
      }
    } catch (err) {
      console.error('[API Admin Login Error]:', err.message);
      return res.status(500).json({ 
        success: false, 
        message: 'Lỗi kết nối cơ sở dữ liệu (Database Timeout hoặc Mạng bị chặn)',
        error: err.message 
      });
    }
  } else {
    return res.json({ success: false, message: 'Please input username and password' });
  }
});

// GET /token
router.get('/token', JwtUtil.checkToken, (req, res) => {
  res.json({ success: true, message: 'Token is valid' });
});

module.exports = router;
