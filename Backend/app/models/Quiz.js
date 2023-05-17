const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const quizSchema = new Schema({
    data: [
        {
            question: {
                type: String,
                required: true
            },
            answers: [
                {
                    answer: {
                        type: String,
                        required: true
                    },
                    is_correct: {
                        type: Boolean,
                        required: true
                    }
                }
            ]
        }
    ]
});

module.exports = model('quizzes', quizSchema);