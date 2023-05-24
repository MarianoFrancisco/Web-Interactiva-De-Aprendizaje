const express = require('express');
const router = express.Router()

const gameTypeRoute = require('./gameType.routes');
const gameRoute = require('./game.routes');
const detailRoute = require('./detail.routes');
const resultRoute = require('./result.routes');
const userRoute = require('./user.routes');
const commentRoute = require('./comment.routes');
const medalRoute = require('./medal.routes');

router.use('/gameType', gameTypeRoute);
router.use('/game', gameRoute);
router.use('/detail', detailRoute);
router.use('/result', resultRoute);
router.use('/user', userRoute);
router.use('/comment',commentRoute);
router.use('/medal',medalRoute);

module.exports = router;