const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  image: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },

  appliedVenues: [{ type: mongoose.Schema.Types.ObjectId, ref: "venue" }],
});

module.exports = mongoose.model("admin", adminSchema);
