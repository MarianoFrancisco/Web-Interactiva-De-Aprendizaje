const express = require('express');
const { insertType, deleteType, getAllGameTypes } = require('../controllers/gameTypeController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');

const routes = express.Router();
routes.get('/get-types', getAllGameTypes)
routes.post('/add-type', verifyJWT, verifyRoles(ROLES_LIST.Admin), insertType);
routes.delete('/delete-type/:id', verifyJWT, verifyRoles(ROLES_LIST.Admin), deleteType);

module.exports = routes;