const chatModel = require("../models/chatModel");
const userModel = require("../models/userModel");

//access chat basically used for fetching and creating data data
// its is a one one one chat.

const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    const error = new Error("User not found");
    res.status(401).send(error);
  }
  let isChat = await chatModel
    .find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: userId } } },
        { users: { $elemMatch: { $eq: req.user._id } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await userModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "username profilePicture email",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await chatModel.create(chatData);
      const FullChat = await chatModel
        .findOne({ _id: createdChat._id })
        .populate("users", "-password");
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
  console.log(isChat);
};

module.exports = accessChat;
