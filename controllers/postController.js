const asyncHandler = require("express-async-handler");
const Posts = require("../models/postsSchema");
const Users = require("../models/usersSchema");
const { body, validationResult } = require("express-validator");
// const { model } = require("mongoose");

// All posts Req for user!
exports.get_postsRequest = asyncHandler(async (req, res, next) => {
  const allPosts = await Posts.find({ published: "true" })
    .sort({ date: 1 })
    .populate("author", "username")
    .populate({
      path: "comments",
      populate: {
        path: "commenter",
        model: "Users",
        select: "username",
      },
    })

    .exec();

  res.json({ allPosts });
});

// All posts Req for Author!
exports.get_postsRequestAuthor = asyncHandler(async (req, res, next) => {
  const allPosts = await Posts.find({})
    .sort({ date: 1 })
    .populate("author", "username")
    .populate({
      path: "comments",
      populate: {
        path: "commenter",
        model: "Users",
        select: "username",
      },
    })

    .exec();

  res.json({ allPosts });
});

// Single Blog post request!

exports.get_post_sigle = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const post = await Posts.findById(postId)
    .populate("author", "username")
    .populate({
      path: "comments",
      populate: {
        path: "commenter",
        model: "Users",
        select: "username",
      },
    });
  if (post.length <= 0) {
    res.status(404).json({ message: "No such post exists!" });
  }
  res.json(post);
});

// Creating blog post

exports.create_blog_post = [
  body("title", "Required field").trim().isLength({ min: 1 }).escape(),
  body("blog", "Required field").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const error = validationResult(req);
    const newPost = new Posts({
      title: req.body.title,
      post: req.body.blog,
      author: req.body.commenter,
      comments: [],
      published: true,
      date: new Date(),
    });

    if (!error.isEmpty()) {
      res.json(error);
    } else {
      await newPost.save();
      res.json({ message: "Post saved successfully" });
    }
  }),
];

// Update specific blog post

exports.post_update_request = [
  body("title", "Required field").trim().isLength({ min: 1 }).escape(),
  body("blog", "Required field").trim().isLength({ min: 5 }).escape(),
  body("published", "Required field").escape(),
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    const error = validationResult(req);
    const post = await Posts.findById(postId);

    const updatedPost = new Posts({
      post: req.body.blog,
      published: req.body.published,
      title: req.body.title,
      date: new Date(),
      comments: [...post.comments],
      _id: postId,
    });

    console.log("this is updatedPost post", updatedPost);

    if (!error.isEmpty()) {
      res.status(401).json(error);
    } else {
      await Posts.findByIdAndUpdate(postId, updatedPost, {});
      res.json({ message: "Post updated successfully" });
    }
  }),
];
// Deleting specific blog post
exports.post_delete_request = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  await Posts.findByIdAndDelete(postId);
  res.json({ message: "Deleted Successfully" });
});
