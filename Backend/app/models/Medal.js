const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const medalSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    position: {
        type: String,
        enum:['1','2','3'],
        required:true
    },
    game_type: {
        type: Schema.Types.ObjectId,
        ref: "gametypes",
        required: true,
    },
    medal_date: { type: Date },
}, {
    versionKey: false
});
medalSchema.pre('save', function (next) {
    this.medal_date = new Date().getTime() - (6 * 60 * 60 * 1000); // Configurar la fecha en UTC-6
    next();
});
module.exports = model('medals', medalSchema);