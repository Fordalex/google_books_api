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
    console.log(
      `https://www.googleapis.com/books/v1/volumes?q=${req.params.search}&key=${REACT_APP_GOOGLE_API_KEY}`
    );
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
        totalPages,
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
        totalPages,
      });

      book.save();
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

// @route        POST api/books/add-note
// @desc         Add a note to a book
// @access       Pubic
router.post(
  "/add-note",
  [
    check("noteInfo", "Please add note info").not().isEmpty(),
    check("noteType", "Please add the note type").not().isEmpty(),
    check("note", "Please add your note").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log('trying to save note')
    // destructure the request
    const { noteInfo, noteType, pageNumber, note, bookId } = req.body;

    const newNote = {
      noteInfo,
      noteType,
      pageNumber,
      note,
      bookId,
    };
    console.log(newNote);

    try {
      let book = await Book.findOne({ _id: bookId });
      console.log(book);

      book.notes.unshift(newNote);

      console.log(book);

      await book.save();

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
