/* global process */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

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
