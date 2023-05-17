const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const gameSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    game_type: {
        type: Schema.Types.ObjectId,
        ref: "GameType",
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
        type: String
    },
    data_game: {
        hangman: {
            type: Schema.Types.ObjectId,
            ref: "Ahorcado"
        },
        letter_soup: {
            type: Schema.Types.ObjectId,
            ref: "LetterSoup"
        },
        memory: {
            type: Schema.Types.ObjectId,
            ref: "Memory"
        },
        quiz: {
            type: Schema.Types.ObjectId,
            ref: "Quiz"
        }
    }
}, {
    versionKey: false
});


module.exports = model('games', gameSchema);