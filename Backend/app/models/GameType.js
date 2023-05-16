const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const gameTypeSchema = new Schema({
    code: {
        type: String,
        required:true,
    },
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
module.exports=model('game_types',gameTypeSchema);