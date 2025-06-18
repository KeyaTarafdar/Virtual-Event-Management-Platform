const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

  eventName: { type: String, required: true },
  date: { type: Date, required: true },
  eventEndDate: {
    type: Date,
    validate: {
      validator: function (v) {
        if (!v) return true;
        return v > this.date;
      },
      message: "End date must be later than start date.",
    },
  },
  time: String,
  speaker: { type: String, required: true },
  headcount: {
    type: Number,
    required: true,
    min: [1, "Headcount must be at least 1"],
  },
  description: String,
  bill: Number,
  meetingLink: String,
  city: String,
  platform: String,

  isPublic: { type: Boolean, default: false },
  isPaid: { type: Boolean, default: false },
  payableAmount: Number,

  eventType: String,

  requestedVenues: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "venue" },
      timeslot: { type: String },
    },
  ],

  rejectedVenueRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "venue",
    },
  ],

  finalVenueDeatails: { type: mongoose.Schema.Types.ObjectId, ref: "venue" },
  finalVenueSlot: String,
  isVenueConfirmed: { type: Boolean, default: false },
  isPaymentDone: { type: Boolean, default: false },

  tillNowTotalRegistration: { type: Number, default: 0 },
  lastDateOfRegistration: Date,

  registeredUser: [
    { type: mongoose.Schema.Types.ObjectId, ref: "user", default: [] },
  ],
  interested: [
    { type: mongoose.Schema.Types.ObjectId, ref: "user", default: [] },
  ],

  posterImage: {
    public_id: { type: String, required: false },
    url: { type: String, required: false, default: "defaultPosterImage.jpg" },
  },
  scannerImage: {
    public_id: { type: String, required: false },
    url: { type: String, required: false, default: "defaultScannerImage.jpg" },
  },
});

module.exports = mongoose.model("event", eventSchema);
