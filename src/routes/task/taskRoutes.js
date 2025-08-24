const express = require('express');
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require('./taskController');
const auth = require('../../middlewares/authMiddleware').auth;
const validate = require('../../middlewares/validate');
const {
  createTaskSchema,
  updateTaskSchema,
} = require('../../validators/taskValidation');

const router = express.Router();

router.use(auth); // protect all task routes

router.post('/', validate(createTaskSchema), createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.put('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
