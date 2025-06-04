const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  companyName: String,
  email: String,
  contact: Number,
  description: String,
  fbLink: String,
  instaLink: String,
  linkedinLink: String,
});

module.exports = mongoose.model("company", companySchema);
