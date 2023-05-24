const express = require('express');
const { insertComment,getAllComents } = require('../controllers/commentController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');

const routes = express.Router();
routes.post('/add-comment', verifyJWT, verifyRoles(ROLES_LIST.Teacher,ROLES_LIST.Student), insertComment);
routes.get('/get-comment', verifyJWT, verifyRoles(ROLES_LIST.Teacher,ROLES_LIST.Student), getAllComents);

module.exports = routes;