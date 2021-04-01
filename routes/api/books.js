const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const axios = require("axios");
const { check, validationResult } = require("express-validator/check");
//  Add book model
const Book = require("../../models/Book");

var REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
if (!REACT_APP_GOOGLE_API_KEY) {
  const config = require("../../config/config");
  REACT_APP_GOOGLE_API_KEY = config.REACT_APP_GOOGLE_API_KEY;
}

// @route        GET api/books/:search
// @desc         Get current user logged in
// @access       Private
router.get("/:search", auth, async (req, res) => {
  try {
    const books = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${req.params.search}&key=${REACT_APP_GOOGLE_API_KEY}`
    );

    res.json(books.data);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route        POST api/books/add
// @desc         Add a book to the database
// @access       Private
router.post(
  "/add",
  [
    check("startDate", "Please enter your start date").not().isEmpty(),
    check("title", "The book title needs to be added").not().isEmpty(),
    check("bookId", "the book id needs to be added").not().isEmpty(),
  ],
  auth,
  async (req, res) => {

    try {
      // destructure the request
      const {
        bookId,
        currentPage,
        finished,
        finishedDate,
        startDate,
        title,
        img,
        rating,
        totalPages
      } = req.body;

      var book = new Book({
        bookId,
        currentPage,
        finished,
        finishedDate,
        startDate,
        title,
        img,
        user: req.user.id,
        rating,
        totalPages
      });

      book.save();

    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
