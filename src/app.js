/* global process */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' })); // 👈 tweak later for frontend domain
app.use(helmet());
app.use(morgan('dev'));
app.use(mongoSanitize());
app.use(xss());

// Rate limiter: 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: 'Too many requests from this IP, try again later',
});
app.use('/api', limiter);

//Health route
app.get('/api/v1/health', (req, res) => {
  try {
    console.log('Health route called');
    const uptime = process.uptime();
    res.status(200).json({ status: 'ok', uptime });
  } catch (err) {
    console.error('Health route error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.use('/api/v1/auth', require('./routes/authentication/authRoutes'));
app.use('/api/v1/tasks', require('./routes/task/taskRoutes'));
app.use(errorHandler);
module.exports = app;
