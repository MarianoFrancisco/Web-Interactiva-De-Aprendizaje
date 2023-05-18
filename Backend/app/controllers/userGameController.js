const Game = require('../models/Game');

const getGamesByUser = async (req, res) => {
    try {
        const id_user = req.params.id;
        const games = await Game.aggregate([
            {
                $match: {
                    user: id_user
                }
            },
            {
                $project: {
                    user: 0,
                    data_game: 1,
                    game: {
                        $arrayElemAt: [
                            {
                                $objectToArray: '$data_game'
                            },
                            0
                        ]
                    }
                }
            },
            {
                $lookup: {
                    from: '$game.k',
                    localField: '$game.v',
                    foreignField: '_id',
                    as: 'gameDetails',
                    pipeline: [
                        {
                            $project: {
                                _id: 0
                            }
                        }
                    ]
                }
            }
        ]);
        if (games) {
            res.status(200).json( games );
        } else {
            res.status(404).json({ error: 'Parece que el usuario no cuenta con juegos aun...' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}