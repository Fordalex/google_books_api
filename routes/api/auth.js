const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
//  Add user model
const User = require("../../models/User");
const Book = require("../../models/Book");

var REACT_APP_JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
if (!REACT_APP_JWT_SECRET) {
  const config = require("../../config/config");
  REACT_APP_JWT_SECRET = config.REACT_APP_JWT_SECRET;
}

// @route        POST api/users
// @desc         Register a new user & get jwt
// @access       Pubic
router.post(
  "/",
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure the request
    const { firstName, lastName, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // See if user exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        firstName,
        lastName,
        email,
        password,
      });

      // Excrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        REACT_APP_JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw errors;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

// @route        GET api/auth
// @desc         Test route
// @access       Pubic
router.get("/authenticated", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Sever Error");
  }
});

// @route        POST api/auth/login
// @desc         Authenticate user & get jwt
// @access       Pubic
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // See if user exists
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        REACT_APP_JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw errors;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route        POST api/auth/remove/:id
// @desc         Remove an account and the users books.
// @access       Private
router.delete("/remove/:id", auth, async (req, res) => {
  try {
    console.log('remove getting called')
    //   Get the current user.
    let user = await User.findOne({ _id: req.params.id });
     // Get all the users books.
     const usersBooks = await Book.find({
        user: req.params.id,
    })

    console.log(user, usersBooks)

    await user.remove();
    await usersBooks.remove();

    console.log(user, usersBooks)

    return res.json({ msg: "Account removed." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
