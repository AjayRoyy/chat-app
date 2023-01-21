const express = require("express");
const accessChat = require("../controllers/accessChatController");
const addToGroup = require("../controllers/addToGroup");
const createGroupChat = require("../controllers/createGroupChatContoller");
const fetchChat = require("../controllers/fetchChatController");
const removeFromGroup = require("../controllers/removeFromGroup");
const renameGroup = require("../controllers/renameGroup");
const ProtectMiddleware = require("../middleware/protectMiddleware");
const Router = express.Router();

Router.post("/", ProtectMiddleware, accessChat);
Router.get("/", ProtectMiddleware, fetchChat);
Router.post("/group", ProtectMiddleware, createGroupChat);
Router.put("/rename", ProtectMiddleware, renameGroup);
Router.put("/groupremove", ProtectMiddleware, removeFromGroup);
Router.put("/groupadd", ProtectMiddleware, addToGroup);

module.exports = Router;
