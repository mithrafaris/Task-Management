const mongoose = require("mongoose");
const User = require("./usermodel");
const Message = require("./messagemodel");

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,  // Use 'User' as a string reference
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Message, 
      }
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
