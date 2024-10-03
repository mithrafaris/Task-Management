const Chat = require("../models/chatModel");
const Message = require("../models/messagemodel");
const { errorHandler } = require("../utils/error");

exports.sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id: receiverID } = req.params;
    const senderID = req.user.id; 
    let conversation = await Chat.findOne({
      participants: {
        $all: [senderID, receiverID],
      },
    });
    if (!conversation) {
      conversation = await Chat.create({
        participants: [senderID, receiverID],
      });
    }
    const newMessage = new Message({
      senderID,
      receiverID,
      message,
    });
    await newMessage.save();
    conversation.messages.push(newMessage._id); 
    await conversation.save();
    res.status(200).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    next(errorHandler(500, 'Failed to send message'));
  }
};
exports.getMessage = async (req, res, next) => {
  try {
    const { id: chatUser } = req.params;
    const senderID = req.user.id; // Use _id for MongoDB reference

    // Find the conversation between sender and chatUser
    const conversation = await Chat.findOne({
      participants: { $all: [senderID, chatUser] }, // Corrected to participants
    }).populate("messages"); // Populate messages instead of message

    // Check if the conversation exists
    if (!conversation) {
      return res.status(404).json({ message: "No conversation found" }); // Correct response for not found
    }

    // Extract messages from the conversation
    const messages = conversation.messages;

    // Respond with the messages
    res.status(200).json({ messages });
  } catch (error) {
    next(errorHandler(500, 'Failed to get message'));
  }
};


