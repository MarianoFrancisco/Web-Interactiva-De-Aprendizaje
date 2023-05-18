const { default: mongoose } = require('mongoose');
const Game = require('../models/Game');

const saveGame = async (req, res) => {
    const user = req.body.user;
    const game_type = req.body.game_type;
    const description = req.body.description;
    const name = req.body.name;
    const time = req.body.time;
    const data_game = req.body.data_game;
    const newGame = new Game({
        user: user,
        game_type: game_type,
        description: description,
        name: name,
        time: time,
        data_game: data_game
    });
    const insertGame = await newGame.save();
    res.json(insertGame);
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

module.exports = {
    saveGame,
    getGamesByUser
}