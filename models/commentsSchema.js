const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentsSchema = new Schema({
  comments: { type: String, required: true, minLength: 2 },
  commenter: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  date: Date,
});

module.exports = mongoose.model("Comments", commentsSchema);
