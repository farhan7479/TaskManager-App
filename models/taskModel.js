
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  dueDate: Date,
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  assignedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
