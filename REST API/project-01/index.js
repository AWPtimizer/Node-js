const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

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
  return res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    res.json({ status: "success", id: users.length });
  });
});
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
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
