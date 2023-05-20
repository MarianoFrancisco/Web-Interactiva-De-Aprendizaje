const GameType = require("../models/GameType");

const getAllGameTypes = async (req, res) => {
  try {
    const result = await GameType.find();
    res.status(200).json(result);
  } catch (error) {
    res
    .status(500)
    .json({ error: "Ocurrio un error interno en el servidor..." });
  }
};
const insertType = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newType = new GameType({
      name,
      description,
    });
    const insert = await newType.save();
    res.status(200).json(insert);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrio un error interno en el servidor..." });
  }
};

const deleteType = async (req, res) => {
  try {
    const id_type = req.params.id;
    const type = await GameType.findByIdAndDelete(id_type);
    if (type) {
      res.sendStatus(200);
    } else {
      res
        .satus(404)
        .json({
          error: "Parece que intentas eliminar un tipo que no existe...",
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrio un error interno en el servidor..." });
  }
};

module.exports = {
  insertType,
  deleteType,
  getAllGameTypes
};
