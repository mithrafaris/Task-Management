const Task = require('../models/taskModel');
const User = require('../models/usermodel');
const { errorHandler } = require('../utils/error');

// Create a task
exports.CreateTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newTaskData = {
      ...req.body,
      userRef: userId,
    };
    const task = await Task.create(newTaskData);

    return res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};
exports. Taskslist = async (req, res) => {
  try {
    const tasks = await Task.find({}).populate('user', 'email');
    res.status(200).json(tasks);
  } catch (err) {
   res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};
console.log("lll");

exports.getUserTasks = async (req, res) => {
console.log("helloooo");

  try {
    const userId = req.user.id; 
    const tasks = await Task.findById({ userRef: userId }).populate('userRef', 'email'); 
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ success: false, message: 'No tasks found for this user.' });
    }
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error('Error fetching user tasks:', error);
    res.status(500).json({ success: false, message: 'Error fetching user tasks' });
  }
};
