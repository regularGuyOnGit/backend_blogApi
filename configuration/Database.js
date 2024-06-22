const mongoose = require("mongoose");
require("dotenv").config();

const databaseConnection = () => {
  try {
    mongoose.connect(process.env.CONNECTION_STRING);
    console.log("database is connected");
  } catch (e) {
    throw new Error(e);
  }
};
databaseConnection();
module.exports = databaseConnection;
