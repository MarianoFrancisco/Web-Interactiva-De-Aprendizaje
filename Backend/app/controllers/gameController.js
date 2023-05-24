const { default: mongoose } = require("mongoose");
const Game = require("../models/Game");
const User = require("../models/User");

const getAllGames = async (req, res) => {
  try {
    const games = await Game.find()
      .populate("user", {
        username: 1,
      })
      .populate("game_type", {
        name: 1,
      });
    res.status(200).json(games);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrio un error interno en el servidor..." });
  }
};

const insertGame = async (req, res) => {
  try {
    const { game_type, description, name, data, time = 5000 } = req.body;
    const newGame = new Game({
      user: req.userId,
      game_type,
      description,
      name,
      time,
      data,
    });
    const insert = await newGame.save();
    res.status(200).json(insert);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrio un error interno en el servidor..." });
  }
};

const getGame = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "game ID required" });
  try {
    const game = await Game.findById(req.params.id).populate("game_type", {
      name: 1,
    });
    if (!game) {
      return res
        .status(204)
        .json({ message: `game ID ${req.params.id} not found` });
    }
    res.json(game);
  } catch (error) {
    console.log(error);
  }
};

const getGamesByUser = async (req, res) => {
  try {
    const user_id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
    const games = await Game.aggregate([
      {
        $match: {
          user: user_id,
        },
      },
      {
        $addFields: {
          data: {
            $arrayElemAt: [
              {
                $objectToArray: "$data_game",
              },
              0,
            ],
          },
        },
      },
      {
        $addFields: {
          detail: {
            $toObjectId: "$data.v",
          },
        },
      },
      {
        $lookup: {
          from: "details",
          localField: "detail",
          foreignField: "_id",
          as: "gameDetails",
        },
      },
      {
        $lookup: {
          from: "gametypes",
          localField: "game_type",
          foreignField: "_id",
          as: "typeDescription",
          pipeline: [
            {
              $project: {
                name: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          typeDescription: 1,
          gameDetails: 1,
        },
      },
    ]);
    if (games) {
      res.status(200).json(games);
    } else {
      res
        .status(404)
        .json({ error: "Parece que el usuario no cuenta con juegos aun..." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Ocurrio un error interno en el servidor..." });
  }
};

const deleteGame = async (req, res, next) => {
  try {
    const id_game = req.params.id;
    const delete_game = await Game.findByIdAndDelete(id_game);
    if (delete_game) {
      res.sendStatus(200);
    } else {
      res
        .status(404)
        .json({ error: "El juego que intentas eliminar no existe..." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrio un error interno en el servidor..." });
  }
};

const updateGame = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  const game = await Game.findById(req.body.id).exec();
  if (!game) {
    return res
      .status(204)
      .json({ message: `No game matches ID ${req.body.id}.` });
  }
  try {
    if (req.body?.name) game.name = req.body.name;
    if (req.body?.description) game.description = req.body.description;
    if (req.body?.time) game.time = req.body.time;
    if (req.body?.data) game.data = req.body.data;
    const result = await game.save();
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrio un error interno en el servidor..." });
  }
};

const getUserLoginGames = async (req, res) => {
  // all the games by a user
  try {
    const user = await User.exists({ username: req.user });
    console.log(user);
    const game = await Game.find({ user: user }).populate("game_type", {
      name: 1,
    });
    if (!game) return res.status(204).json({ message: "No games found" });
    res.json(game);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrio un error interno en el servidor..." });
  }
};

module.exports = {
  insertGame,
  getGamesByUser,
  deleteGame,
  getGame,
  updateGame,
  getUserLoginGames,
  getAllGames,
};
