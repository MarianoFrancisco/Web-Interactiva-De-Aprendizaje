const express = require('express');
const { saveGame, getGamesByUser } = require('../controllers/gameController');

const routes = express.Router();
routes.post('/saveGame', saveGame);
routes.get('/getByUser/:id', getGamesByUser);

module.exports = routes;