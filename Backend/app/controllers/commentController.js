const Comment = require('../models/Comment');

const insertComment = async (req, res, next) => {
    try {
        const user = req.userId;
        const { text, comment_date} = req.body;
        const newComment = new Comment({
            user:user,
            text,
            comment_date
        });
        const insert = await newComment.save();
        res.status(200).json(insert);
    } catch (error) {
        res.status(500).json({ error: 'Ocurrio un error interno en el servidor...' });
    }
}
const getAllComents = async (req, res) => {
    //const coments = await Comment.find();
    //if (!coments) return res.status(204).json({ 'message': 'No comments found' });
    //res.json(coments);
    try {
    const comment = await Comment.find().populate("user", {
      username: 1,
    });
    if (!comment) return res.status(204).json({ message: "No comments found" });
    res.json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrio un error interno en el servidor..." });
  }
}
module.exports = {
    insertComment,
    getAllComents
}