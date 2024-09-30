const Task = require('../models/taskModel');
const User = require('../models/usermodel');
const { errorHandler } = require('../utils/error');


exports.CreateTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    return res.status(201).json(task);
  } catch (error) {
    next(error);
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
    next(error);  
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
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

exports.GetTask = async(req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
    if(!task){
      return next (errorHandler(404,'task not found'))
    }
    res.status(200).json(task)
  } catch (error) {
    next(error)
  }
}

exports.updateStatus = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    const { status } = req.body;
    if (!['pending', 'completed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    task.status = status;
    await task.save();
    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};