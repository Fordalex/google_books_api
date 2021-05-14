const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");
const Books = require("../../models/Book");

// @route        GET api/admin
// @desc         Get all the admin data
// @access       Private
router.get("/", auth, async(req, res) => {

    const total_users = await User.find({})
    const total_books = await Books.find({})

    console.log(total_users)
    console.log(total_books)

    try {
        admin_dict = {
            users: total_users,
            books: total_books,
        }

        res.json(admin_dict);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;