const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  senderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Use 'User' as a string reference
    required: true,
  },
  receiverID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Use 'User' as a string reference
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
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
