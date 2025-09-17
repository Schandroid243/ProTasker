const express = require('express');

const { register, login } = require('./authController');
const validate = require('../../middlewares/validate');
const {
  registerSchema,
  loginSchema,
} = require('../../validators/authValidation');

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

module.exports = router;
