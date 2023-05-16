const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const gameTypeSchema = new Schema({
    code: {
        type: String,
        require:true,
    },
    name: {
        type: String,
        require:true,
    },
    description: {
         type: String
    }
}, {
    versionKey: false
});
module.exports=model('game_types',gameTypeSchema);