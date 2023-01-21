const userModel = require("../models/userModel");
const chatModel = require("../models/chatModel");
const messageModel = require("../models/messageModel");

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await messageModel.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await userModel.populate(message, {
      path: "chat.users",
      select: "username profilePicture email",
    });

    await chatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    const newError = new Error(error.message);
    res.status(400).send(newError);
  }
};

module.exports = sendMessage;
