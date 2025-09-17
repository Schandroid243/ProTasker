/* global process */
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// @desc Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });
    user = await User.create({ name, email, password });
    const token = generateToken(user._id, user.role);
    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(user._id, user.role);
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Server error' });
  }
};
