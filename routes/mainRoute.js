const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const passport = require("../configuration/Auth");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");

// index Router

router.get("/", postController.get_postsRequest);

// Authentication Login
router.post(
  "/",
  passport.authenticate("local", {
    failureMessage: "Incorrect username and password",
  }),
  //   Upon successfull login the users and author will get the jwt tokens.
  //   and verification will be done through it only.
  authController.jwtSign
);

// Authentication Logout

router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) res.json(err);
    else {
      res.end();
    }
  });
});

router.get("/posts/:postId", postController.get_post_sigle);
// User creation router
router.post("/signup", userController.post_user_signup);

// router.get(
//   "/comments",
//   authController.jwtVerify,
//   commentController.comments_get
// );
//! Comment post Router;

router.post(
  "/comments",
  authController.jwtVerify,
  commentController.comments_post
);

module.exports = router;
