const express = require("express");
const { loginController } = require("../controllers/logincontroller");
const { registerController } = require("../controllers/registerController");
const allUsersController = require("../controllers/allUserController");
const ProtectMiddleware = require("../middleware/protectMiddleware");
const Router = express.Router();

Router.post("/login", loginController);
Router.post("/register", registerController);
Router.get("/", ProtectMiddleware, allUsersController);

module.exports = Router;
