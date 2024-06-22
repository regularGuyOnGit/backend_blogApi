const asyncHandler = require("express-async-handler");
const Posts = require("../models/postsSchema");
const Users = require("../models/usersSchema");

exports.get_postsRequest = asyncHandler(async (req, res, next) => {
  const allPosts = await Posts.find({})
    .sort({ date: 1 })
    .populate("author", "username")
    .exec();

  res.json({ allPosts });
  next();
});
