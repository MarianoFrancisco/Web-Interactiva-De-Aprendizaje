const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const resultsSchema = new Schema({
    game_id: {
        type: Schema.Types.ObjectId,
        ref:"GameType",
        require:true,
    },
    username: {
        type: String
    },
    password: {
         type: String
    },
    fullname: {
        type: String
    },
    datebirth: {
        type: DATE
    }
}, {
    versionKey: false
});
module.exports=model('results',resultsSchema);