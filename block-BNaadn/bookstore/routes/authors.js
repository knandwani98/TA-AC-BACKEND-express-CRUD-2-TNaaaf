var express = require("express");
var router = express.Router();

/* new author page */
router.get("/new", function (req, res, next) {
  res.redirect("createAuthor");
});

module.exports = router;
