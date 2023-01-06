var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: { type: String, required: true },
  author: Schema.Types.ObjectId,
  summary: String,
  pages: Number,
  publication: String,
  // categories: [String],
  cover_image: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("Book", bookSchema);
