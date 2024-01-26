const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

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
app.get("/users", (req, res) => {
  /*
    <ul>
      <li>Mehul Lodha</li>
    </ul>
  */
  const html = `
  <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName", "Mehul Lodha"); // Custom Headers
  // Always add X to custom headers as a good practice
  // Here we are setting headers in response side, but for setting them in request side we write req.setHeaders...


  return res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  if (!body || !body.first_name || !body.gender || !body.email || !body.last_name || !body.job_title) return res.status(400).json({msg: "All fields are req..."})
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    res.status(201).json({ status: "success", id: users.length });
  });
});
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({msg: "User not found!!"})
    return res.json(user);
  })
  .patch((req, res) => {
    //TODO: Edit the user with id
    const id = Number(req.params.id);
    const updatedUser = req.body;
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({
          status: "Success",
          msg: "User Updated Successfully",
        });
      });
    }
  })
  .delete((req, res) => {
    //TODO: Delete the user with id
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users.splice(index, 1);
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({
          status: "Success",
          msg: `Deleted User ${index}`,
        });
      });
    }
  });

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
