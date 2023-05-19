const express = require('express');
const { insertGame, getGamesByUser } = require('../controllers/gameController');
const { insertDetail } = require('../controllers/detailController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');

const routes = express.Router();
routes.post('/add-game', verifyJWT, verifyRoles(ROLES_LIST.Teacher), insertDetail, insertGame);
routes.get('/getByUser/:id', verifyJWT, verifyRoles(ROLES_LIST.Teacher), getGamesByUser);

module.exports = routes;