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
    enum: ["pending", "important", "completed"],
    default: "pending",
  },
  date:{
    type: Date,
    required: true,
  },
  userRef: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
