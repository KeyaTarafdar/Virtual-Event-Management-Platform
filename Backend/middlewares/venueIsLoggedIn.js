const jwt = require("jsonwebtoken");
const venueModel = require("../models/venueModel");

module.exports = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    
    if (token) {
      let decode = jwt.verify(token, process.env.JWT_KEY);
      let venue = await venueModel
        .findOne({ email: decode.email })
        .select("-password");
      if (venue) {
        req.venue = venue;
        next();
      }
    }else {
      res.send("You need to login first");
    }
  } catch (err) {
    console.log(err.message);
    res.send("Something went wrong");
  }
};
