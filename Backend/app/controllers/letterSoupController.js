const LetterSoup = require('../models/LetterSoup');

const insertGame = async (req, res) => {
    try {
        const data = req.body.data;
        const newGame = new LetterSoup({
            data
        });
        const insertGame = await newGame.save();
        res.status(200).json( insertGame );
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' })
    }
}

const getGame = async (req, res) => {
    try {
        const id_game = req.params.id;
        const game = await LetterSoup.findById(id_game);
        if (game) {
            res.status(200).json(game);
        } else {
            res.status(400).json({ error: "Parece que el juego de memoria no existe..." });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

const editGame = async (req, res) => {
    try {
        const id_game = req.body.id_game;
        const data = req.body.data;
        const game = await LetterSoup.findByIdAndUpdate(id_game, { data });
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' })
    }
}

const deleteGame = async (req, res) => {
    try {
        const id_game = req.params.id;
        const game = await LetterSoup.findByIdAndDelete(id_game);
        if (game) {
            res.status(200).json(game);
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