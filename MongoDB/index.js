const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Connecting mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/learning-mongodb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error: ", err));

// Schema ->
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

// Creating Schema
const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.method}: ${req.path}\n`,
    (err, data) => {
      next();
    }
  );
});

//Routes ->
app.get("/users", async (req, res) => {
  const allDBUsers = await User.find({});
  /*
    <ul>
      <li>Mehul Lodha</li>
    </ul>
  */
  const html = `
  <ul>
    ${allDBUsers
      .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
      .join("")}
  </ul>
  `;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDBUsers = await User.find({});
  res.setHeader("X-MyName", "Mehul Lodha"); // Custom Headers
  // Always add X to custom headers as a good practice
  // Here we are setting headers in response side, but for setting them in request side we write req.setHeaders...

  return res.json(allDBUsers);
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.gender ||
    !body.email ||
    !body.last_name ||
    !body.job_title
  )
    return res.status(400).json({ msg: "All fields are req..." });
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  // console.log("result: ", result);
  return res.status(201).json({ msg: "User Created" });
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found!!" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    //TODO: Edit the user with id
    await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
    return res.json({ msg: "Success" });

    // const id = Number(req.params.id);
    // const updatedUser = req.body;
    // const index = users.findIndex((user) => user.id === id);
    // if (index !== -1) {
    //   users[index] = { ...users[index], ...updatedUser };
    //   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.json({
    //       status: "Success",
    //       msg: "User Updated Successfully",
    //     });
    //   });
    // }
  })
  .delete(async (req, res) => {
    //TODO: Delete the user with id
    await User.findByIdAndDelete(req.params.id);
    return res.json({ msg: "Success" });



    // const id = Number(req.params.id);
    // const index = users.findIndex((user) => user.id === id);

    // if (index !== -1) {
    //   users.splice(index, 1);
    //   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.json({
    //       status: "Success",
    //       msg: `Deleted User ${index}`,
    //     });
    //   });
    // }
  });

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
