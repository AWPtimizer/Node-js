const express = require("express");
const {
  handleGetAllUsers,
  handlegetUserById,
  handleupdateUserById,
  handledeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handlegetUserById)
  .patch(handleupdateUserById)
  .delete(handledeleteUserById);

module.exports = router;
