const express = require('express');
const {} = require('../controllers/letterSoupController');

const routes = express.Router();
routes.post('/add-game', verifyJWT, verifyRoles(ROLES_LIST.Teacher), insertGame);
routes.get('/view-game/:id', verifyJWT, verifyRoles(ROLES_LIST.Teacher), getGame);
routes.patch('/edit-game', verifyJWT, verifyRoles(ROLES_LIST.Teacher), editGame);
routes.delete('/delete-game/:id', verifyJWT, verifyRoles(ROLES_LIST.Teacher), deleteGame);

module.exports = routes;