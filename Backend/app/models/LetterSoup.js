const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const letterSoupSchema = new Schema({
    data: [
        {
            word: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = model('letter_soups', letterSoupSchema);