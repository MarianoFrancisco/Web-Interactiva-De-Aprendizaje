const express = require('express');
const router = express.Router()

const hangmanRoute = require('./hangman.routes');
const gameTypeRoute = require('./gameType.routes');
const gameRoute = require('./game.routes');
const letterSoupRoute = require('./letterSoup.routes');
const memoryRoute = require('./memory.routes');
const quizRoute = require('./quiz.routes');
const resultRoute = require('./result.routes');
const userRoute = require('./user.routes');

router.use('/hangman', hangmanRoute);
router.use('/gameType', gameTypeRoute);
router.use('/game', gameRoute);
router.use('/letterSoup', letterSoupRoute);
router.use('/memory', memoryRoute);
router.use('/quiz', quizRoute);
router.use('/result', resultRoute);
router.use('/user', userRoute);

module.exports = router;