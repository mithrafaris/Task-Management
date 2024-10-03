const mongoose = require("mongoose");
const User = require("./usermodel");

const MessageSchema = new mongoose.Schema({
  senderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User, 
    required: true, 
  },
  receiverID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,  
    required: true, 
  },
  message: {  
    type: String,
    maxlength: 1000, 
    trim: true,
    required: true,
    validate: [
      {
        validator: (value) => value.length > 0,  // Ensures message is not empty
        message: "Message should not be empty",
      },
      {
        validator: (value) => /^[a-zA-Z0-9\s]*$/.test(value),  // Ensures only alphanumeric characters and spaces
        message: "Message should only contain letters, numbers, and spaces",
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
}, {
  timestamps: true, 
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
