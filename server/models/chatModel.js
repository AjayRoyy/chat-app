const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MessageModel",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
  },
  { timestamps: true }
);

const chatModel = mongoose.model("chatModel", chatSchema);
module.exports = chatModel;
