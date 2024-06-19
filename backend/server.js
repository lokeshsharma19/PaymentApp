require("dotenv").config();
const express = require("express");
const app = express();
const rootRouter = require("./routes/index");
const userRouter = require("./routes/userRoutes");
const accountRouter = require("./routes/accountRouter");
const PORT = process.env.PORT;
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const corsOption = require("./config/corsOptions");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlewares/authMiddleware");

app.use(cors(corsOption));

app.use(cookieParser());

app.use(express.json());

app.use("/api/v1", rootRouter);

app.use("/api/v1/user", userRouter);

app.use("/api/v1/account", authMiddleware, accountRouter);

connectDB();

mongoose.connection.once("open", () => {
  console.log("connected MongoDB");
  app.listen(PORT, () => {
    console.log("Listening on port : ", PORT);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
