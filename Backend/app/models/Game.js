const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const gameSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    game_type: {
        type: Schema.Types.ObjectId,
        ref: "gametypes",
        required: true,
    },
    description: {
        type: String
    },
    name: {
        type: String,
        required: true,
    },
    time: {
        type: Number
    },
    data_game: {
        details: {
            type: Schema.Types.ObjectId,
            ref: "Detail"
        }
    },
    data: Array
}, {
    versionKey: false
});


module.exports = model('games', gameSchema);