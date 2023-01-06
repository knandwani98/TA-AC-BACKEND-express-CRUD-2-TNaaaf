var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  category: { type: String },
  books: [{ type: Schema.Types.ObjectId, ref: "book" }],
});

module.exports = mongoose.model("Category", categorySchema);
