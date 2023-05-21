const express = require("express");
const {
  insertGame,
  getGamesByUser,
  getGame,
  deleteGame,
  updateGame
} = require("../controllers/gameController");
const { insertDetail, deleteDetail } = require("../controllers/detailController");
const { deleteResult } = require('../controllers/resultController');
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");

const routes = express.Router();
routes.post(
  "/add-game",
  verifyJWT,
  verifyRoles(ROLES_LIST.Teacher),
  insertGame
);
routes.get(
  "/getByUser/:id",
  verifyJWT,
  verifyRoles(ROLES_LIST.Teacher),
  getGamesByUser
);
routes.patch('/', verifyJWT, verifyRoles(ROLES_LIST.Teacher), updateGame);
routes.get("/:id", verifyJWT, verifyRoles(ROLES_LIST.Teacher), getGame);
routes.delete('/delete-game/:id', verifyJWT, verifyRoles(ROLES_LIST.Teacher), deleteResult, deleteGame, deleteDetail);
module.exports = routes;
