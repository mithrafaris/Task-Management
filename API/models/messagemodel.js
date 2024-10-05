const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  senderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  receiverID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  
    required: true,
  },
  message: {
    type: String,
    maxlength: 1000,
    trim: true,
    required: true,
    validate: [
      {
        validator: (value) => value.length > 0,  
        message: "Message should not be empty",
      },
      {
        validator: (value) => /^[a-zA-Z0-9\s]*$/.test(value),  
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
