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
    code: {
        type: String,
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
        type: Date
    },
    data_game: {
        ahorcado: {
            type: Schema.Types.ObjectId,
            ref: "Ahorcado",
            validate: {
                validator: function(value) {
                    return this.letter_soup || this.memory || this.quiz;
                }
            }
        },
        letter_soup: {
            type: Schema.Types.ObjectId,
            ref: "LetterSoup",
            validate: {
                validator: function(value) {
                    return this.ahorcado || this.memory || this.quiz;
                }
            }
        },
        memory: {
            type: Schema.Types.ObjectId,
            ref: "Memory",
            validate: {
                validator: function(value) {
                    return this.ahorcado || this.letter_soup || this.quiz;
                }
            }
        },
        quiz: {
            type: Schema.Types.ObjectId,
            ref: "Quiz",
            validate: {
                validator: function(value) {
                    return this.ahorcado || this.letter_soup || this.memory;
                }
            }
        }
    }
}, {
    versionKey: false
});


module.exports = model('games', gameSchema);