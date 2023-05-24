const Medal = require('../models/Medal');
const User = require("../models/User");

const insertMedal = async (req, res, next) => {
    try {
        const { position, game_type } = req.body;
        const user=req.userId;
        const newMedal = new Medal({
            user:user,
            position,
            game_type
        });
        const insert = await newMedal.save();
        res.status(200).json(insert);
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}
const getAllMedals = async (req, res) => {
    try {
        const user = await User.exists({ _id: req.userId });
        const medal = await Medal.find({ user: user }).populate("user", {
            username: 1,
        }).populate("game_type", {
            name: 1,
        });
        if (!medal) return res.status(204).json({ message: "No medals found" });
        res.json(medal);
    } catch (error) {
        res
            .status(500)
            .json({ error: "Ocurrio un error interno en el servidor..." });
    }
}
module.exports = {
    insertMedal,
    getAllMedals
}