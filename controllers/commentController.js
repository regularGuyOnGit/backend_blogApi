const { body, validationResult } = require("express-validator");
const Comments = require("../models/commentsSchema");
const asyncHandler = require("express-async-handler");

exports.comments_get = asyncHandler(async (req, res, next) => {
  const allComments = await Comments.find({}).exec();
  res.status(200).json(allComments);
});
