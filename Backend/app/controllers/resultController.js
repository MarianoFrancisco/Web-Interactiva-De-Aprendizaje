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

const deleteResult = async (req, res) => {
    try {
        const id_result = req.params.id;
        const result = await Result.findByIdAndDelete(id_result);
        if (result) {
            res.sendStatus(200);
        } else {
            res.status(404).json({ error: 'El resultado que intentas eliminar no existe...' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

module.exports = {
    insertResult,
    deleteResult
}