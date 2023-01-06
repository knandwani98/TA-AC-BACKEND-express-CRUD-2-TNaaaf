var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var authorSchema = new Schema({
  name: { type: String, required: true },
  email: String,
  country: String,
  books: [{ type: Schema.Types.ObjectId, ref: "book" }],
});

module.exports = mongoose.model("Author", authorSchema);
