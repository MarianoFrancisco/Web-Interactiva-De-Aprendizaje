const express = require('express');
const { insertResult, getResultsForGame, getResultsByUser, deleteResult } = require('../controllers/resultController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');

const routes = express.Router();
routes.post('/add-result', verifyJWT, verifyRoles(ROLES_LIST.Teacher), insertResult);
routes.get('/get-for-game/:id', getResultsForGame);
routes.get('/get-by-user/:id', verifyJWT, verifyRoles(ROLES_LIST.Student), getResultsByUser);
routes.delete('/delete-result/:id', verifyJWT, verifyRoles(ROLES_LIST.Teacher), deleteResult);

module.exports = routes;