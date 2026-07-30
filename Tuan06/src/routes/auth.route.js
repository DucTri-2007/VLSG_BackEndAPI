const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

/**
 * Public Authentication Route
 * POST /api/auth/login
 */
router.post('/login', AuthController.login);

module.exports = router;
