const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");
const Books = require("../../models/Book");

// @route        GET api/profile/me
// @desc         Get current user logged in
// @access       Private
router.get("/me", auth, async(req, res) => {

    try {
        // Get the user
        const user = await User.findOne({
            _id: req.user.id,
        });

        if (!user) {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }

        // Get all the users books
        const usersBooks = await Books.find({
            user: req.user.id,
        })


        user.usersBooks = usersBooks;

        profile = {
            user: user,
            books: usersBooks,
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;