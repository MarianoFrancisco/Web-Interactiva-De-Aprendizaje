const express = require('express');
const { insertGame, getGame, editGame, deleteGame } = require('../controllers/memoryController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');

const routes = express.Router();
routes.post('/add-game', verifyJWT, verifyRoles(ROLES_LIST.Teacher), insertGame);
routes.get('/view-game/:id', getGame);
routes.patch('/edit-game', editGame);
routes.delete('/delete-game/:id', deleteGame);

module.exports = routes;