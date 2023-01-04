var express = require("express");
const comment = require("../models/comment");
var router = express.Router();

var Article = require("../models/article");
var Comment = require("../models/comment");

// Edit Comment Page
router.get("/:id/edit", (req, res, next) => {
  var commentId = req.params.id;
  Comment.findById(commentId, (err, comment) => {
    if (err) return next(err);
    res.render("editComments.ejs", { comment });
  });
});

// Update Comment
router.post("/:id", (req, res, next) => {
  var commentId = req.params.id;
  Comment.findByIdAndUpdate(commentId, req.body, (err, comment) => {
    if (err) return next(err);
    res.redirect("/articles/" + comment.articleId);
  });
});

// Delete Comment
router.get("/:id/delete", (req, res, next) => {
  var commentId = req.params.id;
  Comment.findByIdAndRemove(commentId, (err, comment) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      comment.articleId,
      {
        $pull: { comments: commentId },
      },
      (err, data) => {
        if (err) return next(err);
        res.redirect("/articles/" + comment.articleId);
      }
    );
  });
});

module.exports = router;
