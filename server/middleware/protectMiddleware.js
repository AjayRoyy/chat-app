const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const ProtectMiddleware = async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      console.log(req.headers.authorization);
      token = req.headers.authorization.split(" ")[1];
      console.log(token);

      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(decode);

      req.user = await userModel.findById(decode.id).select("-password");
      console.log(req.user);
      next();
    } catch (error) {
      res.status(401).json({ err: error.message });
    }
  }
  if (!token) {
    res.status(401).json({
      error: "not authorized , no token",
    });
  }
};

module.exports = ProtectMiddleware;
