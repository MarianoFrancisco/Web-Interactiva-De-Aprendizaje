const express = require('express');
const { saveGame,editGame,deleteGame,getGame } = require('../controllers/hangmanController');

const routes = express.Router();
routes.post('/saveGame', saveGame);
routes.patch('/editGame', editGame);
routes.delete('/deleteGame/:id', deleteGame);
routes.get('/getGame/:id', getGame);
module.exports = routes;