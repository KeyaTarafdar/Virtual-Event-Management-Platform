const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  contact: Number,
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
  createdEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }],
  appliedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }],
  pastEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }],
  
  // Simple payment tracking addition 
  payments: [{
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "event" },
    paymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    method: { type: String, required: true, enum: ['razorpay', 'paypal', 'credit_card'] },
    status: { type: String, default: "pending", enum: ["pending", "completed", "failed"] },
    date: { type: Date, default: Date.now }
  }]
  
});

module.exports = mongoose.model("user", userSchema);