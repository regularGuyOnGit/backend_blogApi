const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const passport = require("../configuration/Auth");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");

// index Router

router.get("/", postController.get_postsRequest);
router.post(
  "/",
  passport.authenticate("local", {
    failureMessage: "Incorrect username and password",
  }),
  //   Upon successfull login the users and author will get the jwt tokens.
  //   and verification will be done through it only.
  authController.jwtSign
);
// User creation router
router.post("/signup", userController.post_user_signup);

router.get(
  "/comments",
  authController.jwtVerify,
  commentController.comments_get
);
router.get;
module.exports = router;

// When sending some strings through body then it only persists in a given route,wheres when sending it through the session it persists to the different routes also.
