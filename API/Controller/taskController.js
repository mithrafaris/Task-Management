const Task = require('../models/taskModel');
const { errorHandler } = require('../utils/error');

// Create a task
exports.taskListing = async (req, res, next) => {
  try {
    const listing = await Task.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

// Get task by ID
exports.getListing = async (req, res, next) => {
  try {
    const listing = await Task.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Task not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// Update task by ID
exports.updateListing = async (req, res, next) => {
  try {
    const listing = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!listing) {
      return next(errorHandler(404, 'Task not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// Delete task by ID
exports.deleteListing = async (req, res, next) => {
  try {
    const listing = await Task.findByIdAndDelete(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Task not found!'));
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Change status of the task
exports.changeStatus = async (req, res, next) => {
  try {
    const listing = await Task.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Task not found!'));
    }
    listing.status = req.body.status;  // "pending", "in progress", or "completed"
    await listing.save();
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
