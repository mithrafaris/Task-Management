const Task = require('../models/taskModel')
const { errorHandler } = require('../utils/error');

exports.taskListing = async (req, res, next) => {
  try {
    const listing = await Task.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
exports.getListing = async (req, res, next) => {
  try {
    const listing = await Task.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};