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
    comment_date: { type: Date, default: Date.now },
}, {
    versionKey: false
});

module.exports = model('comments', commentSchema);