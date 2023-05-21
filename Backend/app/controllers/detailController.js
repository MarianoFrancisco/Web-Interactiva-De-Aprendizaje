const Detail = require('../models/Detail');

const insertDetail = async (req, res, next) => {
    try {
        const data = req.body.data;
        const newDetail = new Detail({
            data
        });
        const insert = await newDetail.save();
        const data_game = {
            details: insert._id
        }
        res.status(200).json(data_game);
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

const getDetail = async (req, res) => {
    try {
        const id_detail = req.params.id;
        const detail = await Detail.findById(id_detail);
        if (detail) {
            res.status(200).json(detail);
        } else {
            res.status(400).json({ error: "Parece que el juego de memoria no existe..." });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

const editDetail = async (req, res) => {
    try {
        const id_detail = req.params.id;
        const data = req.body.data;
        const detail = await Detail.updateOne({ _id: id_detail }, { data });
        if (detail.modifiedCount > 0) {
            res.status(200).json(detail);
        } else {
            res.status(404).json({ error: 'Parece que el juego que intentas actualizar no existe...' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' })
    }
}

const deleteDetail = async (req, res) => {
    try {
        const id_detail = req.body.id;
        const detail = await Detail.deleteOne({ _id: id_detail });
        if (detail.deletedCount > 0) {
            res.sendStatus(200);
        } else {
            res.status(404).json({ error: 'Parece que el detalle que intentas eliminar no existe...' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

module.exports = {
    insertDetail,
    getDetail,
    editDetail,
    deleteDetail
}