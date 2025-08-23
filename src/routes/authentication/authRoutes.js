const express = require('express');
const { body } = require('express-validator');

const { register, login } = require('./authController');

const router = express.Router();

// Register
router.post(
  '/register',
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Valid email is required').isEmail(),
    body('password', 'Password min length is 6').isLength({ min: 6 }),
  ],
  register,
);

// Login
router.post(
  '/login',
  [
    body('email', 'Valid email is required').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  login,
);

module.exports = router;
