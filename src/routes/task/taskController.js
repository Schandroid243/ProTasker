const Task = require('../../models/task');

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      owner: req.user.id, // will come from auth middleware
    });
    return res.status(201).json(task);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id });
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get a single task by ID
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    Object.assign(task, req.body);
    await task.save();
    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
