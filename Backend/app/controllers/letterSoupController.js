const LetterSoup = require('../models/LetterSoup');

const saveGame = async (req, res) => {
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

module.exports = {
    saveGame
}