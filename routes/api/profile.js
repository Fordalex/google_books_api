const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

// @route        GET api/profile/me
// @desc         Get current user logged in
// @access       Private
router.get("/me", auth, async(req, res) => {
    try {
        const user = await User.findOne({
            _id: req.user.id,
        });

        if (!user) {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }
        const readBooks = {
            title: "I've read this",
        };
        const readingBooks = {
            title: "I'm reading this",
        };
        user.readBooks = readBooks;
        user.readingBooks = readingBooks;
        profile = {
            user: user,
            reading: readingBooks,
            read: readBooks
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;