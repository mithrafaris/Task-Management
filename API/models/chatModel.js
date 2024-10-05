const mongoose = require("mongoose");
const Message = require("./messagemodel");

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message", 
      }
    ],
  },
  {
    timestamps: true, 
  }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
