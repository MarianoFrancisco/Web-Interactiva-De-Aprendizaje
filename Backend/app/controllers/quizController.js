const Quiz = require('../models/Quiz');

const insertGame = async (req, res) => {
    try {
        const data = req.body.data;
        const newGame = new Quiz({
            data
        });
        const insert = await newGame.save();
        res.status(200).json(insert);
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

const getGame = async (req, res) => {
    try {
        const id_game = req.params.id;
        const game =await Quiz.findById(id_game);
        if (game) {
            res.status(200).json(game);
        } else {
            res.status(404).json({ error: 'El juego que intentas buscar no existe...' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

const editGame = async (req, res) => {
    try {
        const id_game = req.params.id;
        const data = req.body.data;
        const game = await Quiz.findByIdAndUpdate(id_game, { data });
        if (game) {
            res.status(200).json(game);
        } else {
            res.status(404).json({ error: 'Parece que el juego que intentas actualizar no existe...' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

const deleteGame = async (req, res) => {
    try {
        const id_game = req.params.id;
        const game = await Memory.findByIdAndDelete(id_game);
        if (game) {
            res.sendStatus(200);
        } else {
            res.status(404).json({ error: 'Parece que el juego que intentas eliminar no existe...' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

module.exports = {
    insertGame,
    getGame,
    editGame,
    deleteGame
}