const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const axios = require('axios');
const { check, validationResult } = require("express-validator/check");

var REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
if (!REACT_APP_GOOGLE_API_KEY) {
    const config = require('../../config/config');
    REACT_APP_GOOGLE_API_KEY = config.REACT_APP_GOOGLE_API_KEY;
}

// @route        GET api/books/:search
// @desc         Get current user logged in
// @access       Private
router.get("/:search", auth, async(req, res) => {
    try {

        const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.search}&key=${REACT_APP_GOOGLE_API_KEY}`)
        
        res.json(books.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;