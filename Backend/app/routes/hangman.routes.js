const express = require('express');
const router = express.Router();
const { saveGame } = require('../controllers/hangmanController');
router.post('/saveGame', saveGame);
module.exports = router;