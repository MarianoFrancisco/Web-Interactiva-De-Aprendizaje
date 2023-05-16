const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const hangmanSchema = new Schema({
    data: [{
        pregunta:{
            type:String,
            required:true
        },
        palabra:{
            type:String,
            required:true
        }
    }]
}, {
    versionKey: false
});

module.exports = model('hangmans', hangmanSchema);