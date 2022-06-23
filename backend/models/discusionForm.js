const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    username: String,
    avatar: String,
    content: String,
    userId: String,
    replyName: String,
    replyContent: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comments', commentSchema);
