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
        
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;