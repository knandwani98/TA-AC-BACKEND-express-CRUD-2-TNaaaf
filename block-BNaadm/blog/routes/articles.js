var express = require("express");
var Article = require("../models/article");
var Comment = require("../models/comment");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render("articles.ejs", { articles: articles });
  });
});

// Create Form
router.get("/new", (req, res, next) => {
  res.render("createArticle.ejs");
});

// Post Form
router.post("/", (req, res, next) => {
  req.body.tags = req.body.tags.trim().split(" ");
  Article.create(req.body, (err, article) => {
    var id = article._id;
    if (err) return next(err);
    res.redirect("/articles");
  });
});

// Single Article

router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id)
    .populate("comments")
    .exec((err, article) => {
      if (err) return next(err);
      res.render("singleArticle.ejs", { article });
    });
});

// Edit Article
router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    article.tags = article.tags.join(" ");
    res.render("editArticle.ejs", { article });
  });
});

// Post Updated FORM
router.post("/:id", (req, res, next) => {
  var id = req.params.id;
  req.body.tags = req.body.tags.trim().split(" ");
  Article.findByIdAndUpdate(id, req.body, (err, article) => {
    var id = article._id;
    if (err) return next(err);
    res.redirect("/articles/" + id);
  });
});

// Delete article
router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, article) => {
    if (err) return next(err);
    Comment.deleteMany({ articleId: id }, (err, article) => {
      res.redirect("/articles");
    });
  });
});

// Creating Comment
router.post("/:id/comment", (req, res, next) => {
  var id = req.params.id;
  req.body.articleId = id;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      id,
      { $push: { comments: comment.id } },
      (err, article) => {
        if (err) return next(err);
        res.redirect("/articles/" + id);
      }
    );
  });
});

module.exports = router;
