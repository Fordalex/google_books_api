const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator/check");
//  Add user model
const User = require("../../models/User");


// @route        GET api/users
// @desc         Get all users
// @access       Pubic
router.get('/', async(req, res) => {

    try {
        const users = await User.find();
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
    console.log(req.body)
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
        let user = await User.findOne({ email })

        // See if user exists
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }

        user = new User({
            name,
            email,
            password,
        });

         // Excrypt password
         const salt = await bcrypt.genSalt(10);

         user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.json({msg: "User created"})

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});

module.exports = router;