const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const genearateToken = require("../config/tokenGenerator");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await userModel.findOne({ email });
    const matchpassword = async (enteredpassword) => {
      const comparePasswords = await bcrypt.compare(
        enteredpassword,
        checkUser.password
      );
      return comparePasswords;
    };
    if (checkUser && (await matchpassword(password))) {
      const token = await genearateToken(checkUser._id);
      console.log(token);
      res.status(200).json({
        msg: "User Logged in",
        checkUser,
        token,
      });
    } else {
      res.status(404).json({
        error: "Entered Credentials are Wrong , Please Re-Entere it",
      });
    }
  } catch (error) {
    res.send({
      err: error.message,
    });
  }
};

module.exports = { loginController };
