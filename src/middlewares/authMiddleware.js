/* global process  */
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token)
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  if (req.user && req.user.role != 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: `Invalid or expired token. ${err.message}` });
  }
};
