const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

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

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

app.post("/api/users", (req, res) => {
  //TODO: Create new user
  res.json({
    status: "Pending",
  });
});

// app.patch("/api/users/:id", (req, res) => {
//   //TODO: Edit the user with id
//   res.json({
//     status: "Pending",
//   });
// });

// app.delete("/api/users/:id", (req, res) => {
//   //TODO: Delete the user with id
//   res.json({
//     status: "Pending",
//   });
// });

// As you can see get patch and delete have same path then we can do this below ->
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //TODO: Edit the user with id
    res.json({
      status: "Pending",
    });
  })
  .delete((req, res) => {
    //TODO: Delete the user with id
    res.json({
      status: "Pending",
    });
  });

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
