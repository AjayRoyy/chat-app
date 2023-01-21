const express = require("express");
const allMessages = require("../controllers/allMessagesController");
const sendMessage = require("../controllers/sendMessageController");
const ProtectMiddleware = require("../middleware/protectMiddleware");
const Router = express.Router();

Router.route("/:chatId").get(ProtectMiddleware, allMessages);
Router.route("/").post(ProtectMiddleware, sendMessage);

module.exports = Router;
