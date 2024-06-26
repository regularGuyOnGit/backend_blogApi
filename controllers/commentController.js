const { body, validationResult } = require("express-validator");
const Comments = require("../models/commentsSchema");
const asyncHandler = require("express-async-handler");
const Posts = require("../models/postsSchema");

// exports.comments_get = asyncHandler(async (req, res, next) => {
//   const allComments = await Comments.find({}).populate("commenter").exec();
//   res.status(200).json(allComments);
// });

exports.comments_post = [
  body("comment", "Comment field is must").trim().isLength({ min: 3 }).escape(),

  asyncHandler(async (req, res, next) => {
    console.log(req.body.commenter);
    const { postID } = req.body;
    console.log();
    const error = validationResult(req);
    const newComment = new Comments({
      comments: req.body.comment,
      commenter: req.body.commenter,
      date: new Date(),
    });

    console.log(newComment);

    if (!error.isEmpty) {
      res.json(error);
    } else {
      const savedComment = await newComment.save();
      //   console.log(savedComment);

      const post = await Posts.findByIdAndUpdate(postID, {
        $push: { comments: savedComment._id },
      });
      await post.save();
      console.log("Done");
      res.json({ msg: "Success" });
    }
  }),
];

exports.comment_delete = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params;
  await Comments.findByIdAndDelete(commentId);

  // Error not handled with the error ID
  const deleteCommentInPost = await Posts.find({ comments: commentId });

  const filteredOutComments = deleteCommentInPost[0].comments.filter(
    (commentID, index) => {
      return `${commentID}` != `${commentId}`;
    }
  );

  const updateCommentInPost = new Posts({
    _id: deleteCommentInPost[0]._id,
    comments: [...filteredOutComments],
  });

  console.log("blog Post updatedin comments", updateCommentInPost);
  // console.log("Filtered Comments", filteredOutComments);

  await Posts.findByIdAndUpdate(
    deleteCommentInPost[0]._id,
    updateCommentInPost,
    {}
  );

  res.json({ message: "Comment deleted successfully" });
});
