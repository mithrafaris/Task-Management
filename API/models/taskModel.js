const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  date: {
    type: Date,  // Change to Date type
    required: true,
  },
  userRef: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId for user reference
    ref: "User", // Reference to the User model
    required: true,
  }
}, { timestamps: true });

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
