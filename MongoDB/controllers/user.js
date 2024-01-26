const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
}

async function handlegetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ msg: "User not found!!" });
  return res.json(user);
}

async function handleupdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
  return res.json({ msg: "Success" });
}

async function handledeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ msg: "Success" });
}

async function handleCreateNewUser(req, res) {
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
  return res.status(201).json({ msg: "User Created", id: result._id });
}

module.exports = {
  handleGetAllUsers,
  handlegetUserById,
  handleupdateUserById,
  handledeleteUserById,
  handleCreateNewUser,
};
