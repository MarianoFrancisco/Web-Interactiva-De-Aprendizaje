const express = require("express");
const routes = express.Router();
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const verifyJWT = require("../middleware/verifyJWT");
const {
  createNewUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} = require("../controllers/userController");

routes
  .route("/")
  .get([verifyJWT, verifyRoles(ROLES_LIST.Admin)], getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = routes;
