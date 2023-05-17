const Hangman = require('../models/Hangman');

const saveGame = async (req, res) => {
    try {
        const data = req.body.data;
        const newGame = new Hangman({
            data: data
        });
        const insertGame = await newGame.save();
        res.status(200).json(insertGame);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear nuevo juego de ahorcado' })
    }
};
const editGame = async (req, res) => {
    try {
        const game_id = req.body.id
        const data = req.body.data;
        const updateGame = await Hangman.findByIdAndUpdate(game_id, { data }, { new: true });
        res.status(200).json(updateGame);
    } catch (error) {
        res.status(500).json({ error: 'Error al editar juego del ahorcado' })
    }
};
const deleteGame = async (req, res) => {
    try {
        const game_id = req.params.id;
        const dropGame = await Hangman.findByIdAndDelete(game_id);
        if (dropGame) {
            res.status(200).json(dropGame);
        } else {
            res.status(404).json({ error: 'El juego de ahorcado que quiere eliminar no existe' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar eliminacion del juego de ahorcado seleccionado' });
    }
};
const getGame = async (req, res) => {
    try {
        const game_id = req.params.id
        const selectGame = await Hangman.findById(game_id);
        if (selectGame) {
            res.status(200).json(selectGame);
        } else {
            res.status(400).json({ error: "Juego de ahorcado no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar busqueda' });
    }
};
module.exports = {
    saveGame,
    editGame,
    deleteGame,
    getGame
}