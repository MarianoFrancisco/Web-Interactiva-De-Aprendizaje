const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const resultSchema = new Schema({
    game_id: {
        type: Schema.Types.ObjectId,
        ref:"GameType",
        required:true,
    },
    players:[
        {
           id:{
            type:String,
            required:true,
           },
           score:{
            type:Number,
            required:true,
           },
           position:{
            type:Number,
            required:true,
           },
           time:{
            type:Date,
            required:true,
           }
        }
    ]
}, {
    versionKey: false
});
module.exports=model('results',resultSchema);