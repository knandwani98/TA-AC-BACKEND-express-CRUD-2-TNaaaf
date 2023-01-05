var express = require("express");
var router = express.Router();

/* All Books. */
router.get("/", function (req, res, next) {
  res.render("allBooks", {});
});

module.exports = router;
