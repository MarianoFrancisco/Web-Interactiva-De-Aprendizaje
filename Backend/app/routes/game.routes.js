const express = require('express');
const { saveGame, getGamesByUser } = require('../controllers/gameController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');

const routes = express.Router();
routes.post('/saveGame', verifyJWT, verifyRoles(ROLES_LIST.Teacher), saveGame);
routes.get('/getByUser/:id', verifyJWT, verifyRoles(ROLES_LIST.Teacher), getGamesByUser);

module.exports = routes;