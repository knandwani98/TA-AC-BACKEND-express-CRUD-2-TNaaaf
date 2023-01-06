var express = require("express");
var router = express.Router();

var Book = require("../models/book");
var Author = require("../models/author");

/* All Books. */
router.get("/", function (req, res, next) {
  res.render("allBooks", {});
});

// New Book Page
router.get("/new", function (req, res, next) {
  Author.find({}, (err, authors) => {
    if (err) return next(err);
    res.render("createBook", { authors });
  });
});

// creating book
router.post("/", (req, res, next) => {
  var data = req.body;
  Book.create(data, (err, book) => {
    console.log(err, book);
    if (err) return next(err);
    res.redirect("/books");
  });
});

module.exports = router;
