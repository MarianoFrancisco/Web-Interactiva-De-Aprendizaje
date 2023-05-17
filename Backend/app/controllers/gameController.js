const Game = require('../models/Game');

const saveGame = async (req, res) => {
    const user = req.body.user;
    const game_type = req.body.game_type;
    const description = req.body.description;
    const name = req.body.name;
    const time = req.body.time;
    const data = req.body.data;
    const newGame = new Game({
        user: user,
        game_type: game_type,
        description: description,
        name: name,
        time: time,
        data: data
    });
    const insertGame = await newGame.save();
    res.json(insertGame);
};

module.exports = {
    saveGame,
}