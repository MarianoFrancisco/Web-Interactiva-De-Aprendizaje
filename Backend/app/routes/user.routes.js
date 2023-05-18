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
const auth = require("../controllers/authController");

routes
  .route("/")
  .get([verifyJWT, verifyRoles(ROLES_LIST.Student, ROLES_LIST.Admin)], getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser);

routes.route('/login').post(auth.handleLogin);
routes.route('/logout').get(auth.handleLogout);

routes.get('/refresh', auth.handleRefreshToken);
module.exports = routes;

