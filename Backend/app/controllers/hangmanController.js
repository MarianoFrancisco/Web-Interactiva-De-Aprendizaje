const Hangman = require('../models/Hangman');
const saveGame = async (req, res) => {
    const data = req.body.data;
    const newGame = new Hangman({
        data:data
    });
    const insertGame = await newGame.save();
    res.json(insertGame);
};
module.exports = { saveGame };