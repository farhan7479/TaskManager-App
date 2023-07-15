// taskController.js
const Task = require('../models/taskModel');

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedUser', 'name');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, discription, dueDate, status, assignedUser } = req.body;
    

    // Check user
    const exisitingTask = await userModel.findOne({ title });
    // Existing user
    if (exisitingTask) {
     return res.status(200).send({
         success: false,
         message: "Already Registered, please login",
        });
    }
    const user = await new userModel({
        title,
        discription,
        dueDate,
        status,
        assignedUser,
      }).save();

      res.status(201).send({
        success: true,
        message: "Task  Registered Successfully",
        user,
      });
    } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
   }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json(task);
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json({ message: 'Task deleted successfully' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
