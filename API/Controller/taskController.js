const Task = require('../models/taskModel');
const User = require('../models/usermodel');
const { errorHandler } = require('../utils/error');

exports.CreateTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    return res.status(201).json({ success: true, task });
  } catch (error) {
    next(errorHandler(500, 'Failed to create task'));
  }
};

exports.DeleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(errorHandler(404, 'Task not found!'));
    }
    if (req.user.id !== task.userRef.toString()) {
      return next(errorHandler(401, 'You can only delete your own tasks!'));
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Task has been deleted!' });
  } catch (error) {
    next(errorHandler(500, 'Failed to delete task'));
  }
};

exports.UpdateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(errorHandler(404, 'Task not found!'));
    }
    if (req.user.id !== task.userRef.toString()) {
      return next(errorHandler(401, 'You can only update your own tasks!'));
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    next(errorHandler(500, 'Failed to update task'));
  }
};

exports.GetTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(errorHandler(404, 'Task not found!'));
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    next(errorHandler(500, 'Failed to retrieve task'));
  }
};
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

