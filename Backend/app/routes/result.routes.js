const express = require('express');
const { insertResult, deleteResult } = require('../controllers/resultController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');

const routes = express.Router();
routes.post('/add-result', verifyJWT, verifyRoles(ROLES_LIST.Teacher), insertResult);
routes.delete('/delete-result/:id', verifyJWT, verifyRoles(ROLES_LIST.Teacher), deleteResult);

module.exports = routes;