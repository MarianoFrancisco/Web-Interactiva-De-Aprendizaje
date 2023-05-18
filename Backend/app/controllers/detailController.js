const Detail = require('../models/Detail');

const insertDetail = async (req, res) => {
    try {
        const data = req.body.data;
        const newDetail = new Detail({
            data
        });
        const insert = await newDetail.save();
        res.status(200).json( insert );
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

const getDetail = async (req, res) => {
    try {
        const id_Detail = req.params.id;
        const Detail = await Detail.findById(id_Detail);
        if (Detail) {
            res.status(200).json(Detail);
        } else {
            res.status(400).json({ error: "Parece que el juego de memoria no existe..." });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}

const editDetail = async (req, res) => {
    try {
        const id_Detail = req.params.id;
        const data = req.body.data;
        const Detail = await Detail.findByIdAndUpdate(id_Detail, { data });
        if (Detail) {
            res.status(200).json(Detail);
        } else {
            res.status(404).json({ error: 'Parece que el juego que intentas actualizar no existe...' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' })
    }
}

const deleteDetail = async (req, res) => {
    try {
        const id_Detail = req.params.id;
        const Detail = await Detail.findByIdAndDelete(id_Detail);
        if (Detail) {
            res.sendStatus(200);
        } else {
            res.status(404).json({ error: 'Parece que el juego que intentas eliminar no existe...' });
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