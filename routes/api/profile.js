const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

// @route        GET api/profile/user/:user_id
// @desc         Get profile by user ID
// @access       Public
router.get("/user/:user_id", async(req, res) => {
    try {
        const profile = await User.findOne({
            _id: req.params.user_id,
        }).populate("user", ["name", "avatar"]);
        if (!profile) return res.status(400).json({ msg: "Profile not found." });
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == "ObjectId") {
            return res.status(400).json({ msg: "Profile not found." });
        }

        res.status(500).send("Server Error");
    }
});

module.exports = router;