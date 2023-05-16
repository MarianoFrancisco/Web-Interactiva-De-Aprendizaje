const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const resultSchema = new Schema({
    game_id: {
        type: Schema.Types.ObjectId,
        ref:"GameType",
        require:true,
    },
    username: {
        type: String,
        require:true,
    },
    password: {
         type: String,
         require:true,
    },
    fullname: {
        type: String,
        require:true,
    },
    datebirth: {
        type: DATE,
        require:true,
    }
}, {
    versionKey: false
});
module.exports=model('results',resultSchema);