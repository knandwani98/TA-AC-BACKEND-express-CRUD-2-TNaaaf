var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: String,
  summary: String,
  pages: Number,
  publication: String,
  cover_image: String,
});

mondule.exports = mongoose.model();
