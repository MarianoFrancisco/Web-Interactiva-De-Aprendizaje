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
        res.status(200).json(insert);
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

const getResultsForGame = async (req, res) => {
    try {
        const id = req.params.id;
        const results = await Result.find({ _id: id}).populate("players.player", {
            username: 1,
        });
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).jason({ message: 'No se encontraron resultados de este juego...' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

const getResultsByUser = async (req, res) => {
    try {
        const id_player = req.params.id;
        const results = await Result.find({ 'players.player': id_player });
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: 'No cuentas con resultados aun...' });
        }
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
    getResultsForGame,
    getResultsByUser,
    deleteResult
}