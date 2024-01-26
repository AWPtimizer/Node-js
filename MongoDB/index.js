const express = require("express");
const { connectMongoDb } = require("./connection");

const { logReqRes } = require("./middlewares");

const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// Connecting mongoose
connectMongoDb("mongodb://127.0.0.1:27017/learning-mongodb").then(() => console.log("MongoDB Connected"))

app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

//Routes ->
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
