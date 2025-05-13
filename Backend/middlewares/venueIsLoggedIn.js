const jwt = require("jsonwebtoken");
const venueModel = require("../models/venueModel");
const { errorResponse_catchError } = require("../responseObject");

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
      } else {
        return errorResponse_notFound("Venue account Not found");
      }
    } else {
      res.send({ success: false, message: "You need to login first" });
    }
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};
