const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require("express-validator/check");
//  Add user model
const User = require("../../models/User");

var REACT_APP_JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
if (!REACT_APP_JWT_SECRET) {
    const config = require('../../config/config');
    REACT_APP_JWT_SECRET = config.REACT_APP_JWT_SECRET;
}

// @route        POST api/users
// @desc         Register a new user
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

// @route        POST api/auth/login
// @desc         Authenticate user & get token
// @access       Pubic
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })

        // See if user exists
        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            REACT_APP_JWT_SECRET, { expiresIn: 360000 },
            (err, token) => {
                if (err) throw errors;
                res.json({ token });
            });
            

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

module.exports = router;