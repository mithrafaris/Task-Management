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
    enum: ["pending","completed"],
    default: "pending",
  },
  date:{
    type: String,
    required: true,
  },
  userRef: {
    type: String,
    required: true
  },
  createdAt: { type: Date, 
    default: Date.now },
  updatedAt: { type: Date,
     default: Date.now },
}, { timestamps: true });

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
