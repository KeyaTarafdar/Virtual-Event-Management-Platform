const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

  eventName: String,
  date: Date,
  eventEndDate: Date,
  time: String,
  speaker: String,
  headcount: Number,
  description: String,
  bill: Number,
  mettingLink: String,

  isPublic: Boolean,
  isPaid: Boolean,
  payableAmount: Number,

  eventType: String,

  venue_1: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "venue" },
    timeslot: { type: String },
  },
  venue_2: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "venue" },
    timeslot: { type: String },
  },
  venue_3: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "venue" },
    timeslot: { type: String },
  },

  city: String,
  hallName: String,
  hallBookingTime: String,
  platform: String,
  isVanueConfirmed: { type: Boolean, default: false },

  tillNowTotalRegistration: { type: Number, default: 0 },
  lastDateOfRegistration: Date,

  registeredUser: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],

  interested: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],

  posterImage: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  scannerImage: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
});

module.exports = mongoose.model("event", eventSchema);
