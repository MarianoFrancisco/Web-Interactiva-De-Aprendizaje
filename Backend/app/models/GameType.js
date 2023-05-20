const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const gameTypeSchema = new Schema({
    name: {
        type: String,
        required:true,
    },
    description: {
         type: String
    }
}, {
    versionKey: false
});

module.exports=model('gametypes',gameTypeSchema);