const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  companyName: String,
  email: String,
  contact: Number,
  description: String,
  fbLink: String,
  instaLink: String,
  linkedinLink: String,
  address: String,
});

module.exports = mongoose.model("company", companySchema);
