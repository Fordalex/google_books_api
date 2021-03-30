const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");


// @route        GET api/users
// @desc         Get all users
// @access       Pubic
router.get('/', async(req, res) => {

    try {
        const users = await User.findOne({'email': 'alex96ford19@gmail.com'});
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});

// @route        POST api/users
// @desc         Create a new user
// @access       Pubic
router.post('/',[
    check("name", 'Name is required').not().isEmpty(),
    check("email", 'Please include a valid email').isEmail(),
    check("password", 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // destructure the request
    const {
        name,
        email,
        password
    } = req.body;

    try {
        user = new User({
            name,
            email,
            password,
        });

        await user.save();

        res.send("User created")

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});

module.exports = router;