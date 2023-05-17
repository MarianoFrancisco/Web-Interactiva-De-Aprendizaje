const express = require('express');
const { saveGame } = require('../controllers/gameController');
const routes = express.Router();
routes.post('/saveGame', saveGame);
module.exports = routes;