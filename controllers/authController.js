const jwt = require("jsonwebtoken");
const User = require("../models/usersSchema");
require("dotenv").config();

exports.jwtSign = async (req, res, next) => {
  console.log(req.session.passport);
  const user = await User.findById(req.session.passport.user);
  console.log(user);

  jwt.sign(
    { username: user.username, first_name: user.first_name },
    process.env.SECRET_KEY,
    { algorithm: "HS256" },
    (err, token) => {
      if (err) next(err);
      else {
        // Here i have made token available in the session, Instead i want this token to be available in the local storage of client.
        //req.session.token = token;
        res.json({ token: token });
      }
    }
  );
};

exports.jwtVerify = (req, res, next) => {
  console.log(req.headers);
  jwt.verify(
    // Here i have taken token from session , Instead i want to take token from the client's local storage.
    req.headers.authorization,
    process.env.SECRET_KEY,
    (err, decodedPayload) => {
      if (err) res.sendStatus(403);
      else {
        console.log(decodedPayload);
        next();
      }
    }
  );
};
