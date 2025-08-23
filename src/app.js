/* global process */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//Health route
app.get('api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

const authRoute = require('./routes/authentication/authRoutes');
app.use('api/v1/auth', authRoute);

module.exports = app;
