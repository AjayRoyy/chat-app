const express = require("express");
const cors = require("cors");
require("dotenv").config;
const userRouter = require("./Routes/userRouter");
const chatRouter = require("./Routes/chatRouter");
const messageRouter = require("./Routes/messageRoute.js");
const connectToDb = require("./config/mongoDbConnect");
const {
  notFoundPage,
  errorHandler,
} = require("./middleware/ErrorhandlerMiddleware");

connectToDb();
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "home page",
  });
});

app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

app.use(notFoundPage);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server listening at ${port}`);
});
