const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const memorySchema = new Schema({
    data: [
        {
            first: {
                type: String,
                required: true
            },
            second: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = model('memories', memorySchema);