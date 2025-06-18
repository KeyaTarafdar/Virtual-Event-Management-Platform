const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: String,
  email: String,
  temporaryPassword: String,
  password: String,
  contact: String,
  ownerName: String,
  hallType: String,
  description: String,

  address: String,
  city: String,

  maxCapacity: Number,
  canOrganizeMultidayEvent: Boolean,
  projector: Boolean,
  broadband: Boolean,

  time_1stHalf: [String],
  bookingPrice_1stHalf: Number,
  time_2ndHalf: [String],
  bookingPrice_2ndHalf: Number,
  time_fullDay: [String],
  bookingPrice_fullDay: Number,

  openingtime: String,
  closingtime: String,

  acceptedByAdmin: { type: Boolean, default: false },

  images: [
    {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
  ],

  profilepicture: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },

  completePercentage: {
    type: Number,
    default: 40,
  },

  bookedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }],
  bookingRequests: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
      timeslot: { type: String },
    },
  ],

  // bookingDates: {
  //   type: [Date],
  // },

  // bookingShifts: {
  //   type: [String],
  // },

  bookings: [
    {
      date: Date,
      slot: String,
    },
  ],
});

module.exports = mongoose.model("venue", venueSchema);
