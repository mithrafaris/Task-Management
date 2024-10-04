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
      date: new Date(), 
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
    const senderID = req.user.id; 

    
    const conversation = await Chat.findOne({
      participants: { $all: [senderID, chatUser] }, 
    }).populate("messages"); 

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


