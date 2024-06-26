const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const passport = require("../configuration/Auth");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");

// Author Routes

// Login only for the Author and assigning him jwt token.
router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: "Incorrect username and password",
  }),
  userController.Author_middleware_login,
  authController.jwtSign
);

// All Posts Request
router.get(
  "/all-blog-posts",
  authController.jwtVerify,
  postController.get_postsRequestAuthor
);

// single post request
router.get(
  "/blog/:postId",
  authController.jwtVerify,
  postController.get_post_sigle
);

// Creating a blog post
router.post(
  "/blog-post/new",
  authController.jwtVerify,
  postController.create_blog_post
);

// Specific post request(Needed for updating of specific post)
router.post(
  "/all-blog-posts/update/:postId",
  authController.jwtVerify,
  postController.post_update_request
);
// Specific post request(Needed for deleting of specific post)
router.post(
  "/all-blog-posts/delete/:postId",
  authController.jwtVerify,
  postController.post_delete_request
);

// Deleting comments from the posts.
router.post(
  "/comments/:commentId",
  authController.jwtVerify,
  commentController.comment_delete
);

// Logout Request

router.post("/logout", (req, res, next) => {
  req.logOut(function (err) {
    if (err) res.status(500).end();
    else {
      res.end();
    }
  });
});

module.exports = router;
