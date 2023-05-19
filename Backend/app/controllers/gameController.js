const { default: mongoose } = require('mongoose');
const Game = require('../models/Game');

const insertGame = async (req, res) => {
    try {
        const { user, game_type, description, name, time, data_game } = req.body;
        const newGame = new Game({
            user,
            game_type,
            description,
            name,
            time,
            data_game
        });
        const insert = await newGame.save();
        res.status(200).json( insert );
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
};

const getGamesByUser = async (req, res) => {
    try {
        const user_id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
        const games = await Game.aggregate([
            {
                $match: {
                    user: user_id
                }
            },
            {
                $addFields: {
                    data: {
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
                $addFields: {
                    detail: {
                        $toObjectId: '$data.v'
                    }
                }
            },
            {
                $lookup: {
                    from: 'details',
                    localField: 'detail',
                    foreignField: '_id',
                    as: 'gameDetails'
                }
            },
            {
                $lookup: {
                    from: 'gametypes',
                    localField: 'game_type',
                    foreignField: '_id',
                    as: 'typeDescription',
                    pipeline: [
                        {
                            $project: {
                                name: 1
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    name: 1,
                    description: 1,
                    typeDescription: 1,
                    gameDetails: 1
                }
            }
        ]);
        if (games) {
            res.status(200).json(games);
        } else {
            res.status(404).json({ error: 'Parece que el usuario no cuenta con juegos aun...' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

const deleteGame = async (req, res, next) => {
    try {
        const id_game = req.params.id;
        const delete_game = await Game.findByIdAndDelete(id_game);
        if (delete_game) {
            req.body.id = delete_game.data_game.details;
            next();
        } else {
            res.status(404).json({ error: 'El juego que intentas eliminar no existe...' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

module.exports = {
    insertGame,
    getGamesByUser,
    deleteGame
}