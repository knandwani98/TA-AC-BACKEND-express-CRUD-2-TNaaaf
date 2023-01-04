var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    content: { type: String, required: true },
    articleId: Schema.Types.ObjectId,
    likes: { type: Number, default: 0 },
    author: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
