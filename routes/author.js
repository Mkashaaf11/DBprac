const express = require("express");
const router = express.Router();
const Author = require("../models/authors");

//All Authors Route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name != "") {
    //req.query for get request,body.name etc for post
    searchOptions.name = new RegExp(req.query.name, "i"); //i for case insensitive
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
});

//New Author Route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//Create Author Route
router.post("/", (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  author
    .save()
    .then((newAuthor) => {
      // Author saved successfully
      res.redirect("authors");
    })
    .catch((err) => {
      // Error occurred while saving the author
      res.render("authors/new", {
        author: author,
        errorMessage: "Error Creating Author",
      });
    });
});
module.exports = router;
