const { mongo, default: mongoose } = require('mongoose');
const Result = require('../models/Result');

const insertResult = async (req, res) => {
    try {
        const { game_id, players } = req.body;
        const newResult = new Result({
            game_id,
            players
        });
        const insert = newResult.save();
        res.status(200).json( insert ); 
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

const deleteResult = async (req, res, next) => {
    try {
        const game_id = req.params.id;
        const deleteResults = await Result.deleteMany({ game_id });
        next();
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

module.exports = {
    insertResult,
    deleteResult
}