const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    text: {
        type: String
    },
    comment_date: { type: Date },
}, {
    versionKey: false
});
commentSchema.pre('save', function (next) {
    this.comment_date = new Date().getTime() - (6 * 60 * 60 * 1000); // Configurar la fecha en UTC-6
    next();
});
module.exports = model('comments', commentSchema);