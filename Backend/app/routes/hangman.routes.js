const express = require('express');
const { saveGame } = require('../controllers/hangmanController');

const routes = express.Router();
routes.post('/saveGame', saveGame);

module.exports = routes;