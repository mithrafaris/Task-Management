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






  

