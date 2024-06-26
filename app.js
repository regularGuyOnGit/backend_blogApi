const express = require("express");
const app = express();
const cookierParser = require("cookie-parser");
const logger = require("morgan");
const database = require("./configuration/Database");
const mainRouter = require("./routes/mainRoute");
const authorRouter = require("./routes/authorRoute");
const session = require("express-session");
const passport = require("./configuration/Auth");
const cors = require("cors");
require("dotenv").config();

app.use(cookierParser());
app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: "false" }));
app.use(cors());

//
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.session());

// Routes;
app.use("/", mainRouter);
app.use("/Author", authorRouter);

// Error Handler;

app.use(function (error, req, res, next) {
  res.status(error.status || 500).json({ message: error.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening to port number ${process.env.PORT}`);
});
