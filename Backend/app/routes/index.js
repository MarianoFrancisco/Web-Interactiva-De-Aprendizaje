const express = require('express');
const router = express.Router()

const ahorcadoRoute = require('./app/routes/ahorcado.routes');
const gameTypeRoute = require('./app/routes/gameType.routes');
const letterSoupRoute = require('./app/routes/letterSoup.routes');
const memoryRoute = require('./app/routes/memory.routes');
const quizRoute = require('./app/routes/quiz.routes');
const resultRoute = require('./app/routes/result.routes');
const userRoute = require('./app/routes/user.routes');

app.use('/ahorcado', ahorcadoRoute);
app.use('/gameType', gameTypeRoute);
app.use('/letterSoup', letterSoupRoute);
app.use('/memory', memoryRoute);
app.use('/quiz', quizRoute);
app.use('/result', resultRoute);
app.use('/user', userRoute);

module.exports = router;