// src/jobs/cleanupJob.js
const cron = require('node-cron');
const Task = require('../models/task');

// Schedule a cleanup job to remove completed and archived tasks
// Runs every night at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('🧹 Running cleanup job...');
  try {
    await Task.deleteMany({ completed: true, archived: true });
    console.log('Cleanup finished!');
  } catch (err) {
    console.error('Cleanup failed:', err);
  }
});
