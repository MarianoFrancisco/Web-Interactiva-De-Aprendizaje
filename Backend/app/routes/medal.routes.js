const express = require('express');
const { insertMedal,getAllMedals } = require('../controllers/medalController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');

const routes = express.Router();
routes.post('/add-medal',verifyJWT, verifyRoles(ROLES_LIST.Student), insertMedal);
routes.get('/get-medals', verifyJWT, verifyRoles(ROLES_LIST.Student), getAllMedals);

module.exports = routes;