const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const detailSchema = new Schema({
    data: [
        Schema.Types.Mixed
    ]
}, {
    versionKey: false
});

module.exports = model('details', detailSchema);