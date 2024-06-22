const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true }, //Specify normal user or a author ?
});

module.exports = mongoose.model("Users", usersSchema);
