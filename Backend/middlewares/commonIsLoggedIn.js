const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const adminModel = require("../models/adminModel");
const venueModel = require("../models/venueModel");
const {
  errorResponse_notFound,
  errorResponse_catchError,
} = require("../responseObject/errorResponse");

module.exports = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (token) {
      let decode = jwt.verify(token, process.env.JWT_KEY);
      let user = await userModel
        .findOne({ email: decode.email })
        .select("-password");
      let venue = await venueModel
        .findOne({ email: decode.email })
        .select("-password");
      let admin = await adminModel
        .findOne({ email: decode.email })
        .select("-password");

      if (user) {
        req.user = user;
        next();
      } else if (venue) {
        req.venue = venue;
        next();
      } else if (admin) {
        req.admin = admin;
        next();
      } else {
        return errorResponse_notFound("User Not found");
      }
    } else {
      res.send({ success: false, message: "You need to login first" });
    }
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};
