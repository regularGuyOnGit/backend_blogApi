const asyncHandler = require("express-async-handler");
const User = require("../models/usersSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.post_user_signup = [
  body("username", "Username Field is mandatory")
    .custom(async (value) => {
      const userFound = await User.find({ username: value });

      if (userFound.length >= 1) {
        throw new Error("Username already in use!");
      }
    })
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("first_name", "first_name Field is mandatory")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "last_name Field is mandatory")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "password Field is mandatory")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const error = validationResult(req);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: hashedPassword,
      userType: "normal",
    });
    if (!error.isEmpty()) {
      res.status(400).json(error);
    } else {
      await newUser.save();
      res.status(201).json({ message: "Success" });
    }
  }),
];
