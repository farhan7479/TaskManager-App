
const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

// GET /tasks - Fetch all tasks
router.get('/', taskController.getAllTasks);

// POST /tasks - Create a new task
router.post('/create', taskController.createTask);

// PUT /tasks/:taskId - Update a task
router.put('/update/:taskId', taskController.updateTask);

// DELETE /tasks/:taskId - Delete a task
router.delete('/delete/:taskId', taskController.deleteTask);

module.exports = router;
