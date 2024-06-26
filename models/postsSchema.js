const mongoose = require("mongoose");
const { Schema } = mongoose;

const postsSchema = new Schema({
  title: { type: String, required: true },
  post: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comments", required: true }],
  published: Boolean,
  date: Date,
});

module.exports = mongoose.model("Posts", postsSchema);
