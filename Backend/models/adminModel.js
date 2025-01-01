const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,

  appliedVenues:[{ type: mongoose.Schema.Types.ObjectId, ref: "venue" }]
});

module.exports = mongoose.model("admin", adminSchema);
