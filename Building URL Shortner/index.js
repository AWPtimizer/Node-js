const express = require("express");
const { connectToMongoDB } = require("./connection");
const URL = require("./models/url");
const path = require("path");
const cookieParser = require('cookie-parser');

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB Connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", checkAuth, userRoute);
app.use("/", checkAuth, staticRoute);

app.get("/url/:shorId", async (req, res) => {
  const shortId = req.params.shorId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Server Started at PORT:${PORT}`);
});
