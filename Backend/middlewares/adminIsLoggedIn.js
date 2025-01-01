const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");

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
      }
    } else {
      res.send("You need to login first");
    }
  } catch (err) {
    console.log(err.message);
    res.send("Something went wrong");
  }
};
