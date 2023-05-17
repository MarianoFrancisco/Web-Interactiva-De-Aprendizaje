const express = require("express");
const routes = express.Router();
const {
  createNewUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} = require("../controllers/userController");

routes.route('/')
.get(getAllUsers)
.post(createNewUser)
.patch(updateUser)
.delete(deleteUser);

module.exports = routes;
