const express = require('express');
const { insertDetail, getDetail, editDetail, deleteDetail } = require('../controllers/detailController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');

const routes = express.Router();
routes.post('/add-detail', insertDetail);
routes.get('/view-detail/:id', verifyJWT, verifyRoles(ROLES_LIST.Teacher), getDetail);
routes.patch('/edit-detail/:id', verifyJWT, verifyRoles(ROLES_LIST.Teacher), editDetail);
routes.delete('/delete-detail/:id', verifyJWT, verifyRoles(ROLES_LIST.Teacher), deleteDetail);

module.exports = routes;