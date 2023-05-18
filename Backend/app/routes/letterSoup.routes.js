const express = require('express');
const { insertGame, getGame, editGame, deleteGame } = require('../controllers/letterSoupController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');

const routes = express.Router();
routes.post('/add-game', verifyJWT, verifyRoles(ROLES_LIST.Teacher), insertGame);
routes.get('/view-game/:id', verifyJWT, verifyRoles(ROLES_LIST.Teacher), getGame);
routes.patch('/edit-game/:id', verifyJWT, verifyRoles(ROLES_LIST.Teacher), editGame);
routes.delete('/delete-game/:id', verifyJWT, verifyRoles(ROLES_LIST.Teacher), deleteGame);

module.exports = routes;