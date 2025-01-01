// *venue-model.js*
const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: String,
  email: String,
  temporaryPassword: String,
  password: String,
  contact: String,

  address: String,
  city: String,

  maxCapacity: Number,
  bookingPrice: Number,
  canOrganizeMultidayEvent:Boolean,
  
  openingtime: String,
  closingtime: String,
  noOfSlot: Number,
  timeDivisionOfSlot: [String],
  priceOfSlots: [Number],

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

  completePercentage: {
    type: Number,
    default: 37,
  },

  bookedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }],
  bookingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }],

  bookingDates: {
    type: [Date],
  },

  bookingShifts: {
    type: [String],
  },
});

module.exports = mongoose.model("venue", venueSchema);
