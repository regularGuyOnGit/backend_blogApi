const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/usersSchema");
const bcrypt = require("bcryptjs");

passport.use(
  "local",
  new LocalStrategy(async (username, password, done) => {
    try {
      const userFind = await User.findOne({ username: username }).exec();
      if (!userFind) {
        return done(null, false, {
          message: "Incorrect username and password",
        });
      }
      const matched = await bcrypt.compare(password, userFind.password);
      if (!matched) {
        return done(null, false, {
          messsage: "Incorrect username and password",
        });
      }
      return done(null, userFind);
    } catch (e) {
      return console.log(e);
    }
  })
);
passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (user, done) => {
  const userFound = await User.findById(user);
  return done(null, userFound);
});

module.exports = passport;
