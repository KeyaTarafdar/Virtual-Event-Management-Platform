// *comment-model.js*
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "event" },
  commentBody: String,
  reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  likeCount: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

module.exports = mongoose.model("comment", commentSchema);