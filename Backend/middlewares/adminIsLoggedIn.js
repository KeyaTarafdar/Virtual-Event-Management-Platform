const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");
const {
  errorResponse_catchError,
  errorResponse_notFound,
} = require("../responseObject");

module.exports = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (token) {
      let decode = jwt.verify(token, process.env.JWT_KEY);
      let admin = await adminModel
        .findOne({ email: decode.email })
        .select("-password");
      if (admin) {
        req.admin = admin;
        next();
      } else {
        return res.send({ success: false, message: "Admin account Not found" });
      }
    } else {
      res.send({ success: false, message: "You need to login first" });
    }
  } catch (err) {
    console.log(err.message);
    return errorResponse_catchError(res, err.message);
  }
};
