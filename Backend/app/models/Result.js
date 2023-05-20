const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const resultSchema = new Schema({
    game_id: {
        type: Schema.Types.ObjectId,
        ref: "Game",
        required: true,
    },
    players: [
        {
            player: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            score: {
                type: Number,
                required: true,
            },
            position: {
                type: Number,
                required: true,
            },
            time: {
                type: String
            }
        }
    ]

}, {
    versionKey: false
});

module.exports = model('results', resultSchema);