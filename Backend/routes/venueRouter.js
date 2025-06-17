const express = require("express");
const router = express.Router();
const venueIsLoggedIn = require("../middlewares/venueIsLoggedIn");
const {
  signUp,
  loginVenue,
  logoutVenue,
  updatePasswordFirstTime,
  fetchVenueUser,
  uploadVenueProfilePicture,
  updateHallName,
  updateHallCity,
  updateHallEmail,
  updateHallContact,
  updateHallAddress,
  updateHallCapacity,
  updateHallMultiday,
  updateHallTime,
  updateHallType,
  updateHall_1stHalfTime,
  updateHall_2ndHalfTime,
  updateHall_fullDayTime,
  updateHall_1stHalfPrice,
  updateHall_2ndHalfPrice,
  updateHall_fullDayPrice,
  updateHallOpeningTime,
  updateHallClosingTime,
  updateHallDescription,
  updateHallProjector,
  updateHallBroadband,
} = require("../controller/venueController");

router.get("/", (req, res) => {
  res.send("Venue");
});

// VENUE REGISTER
router.post("/signup", signUp);

// UPLOAD PROFILE PICTURE (USING CLOUDINARY)
router.post(
  "/uploadvenueprofilepicture",
  venueIsLoggedIn,
  uploadVenueProfilePicture
);

// VENUE LOGIN
router.post("/login", loginVenue);

// VENUE LOGOUT
router.get("/logout", venueIsLoggedIn, logoutVenue);

// UPDATE PASSWORD
router.put("/updatepasswordfirsttime", updatePasswordFirstTime);

// FETCH VENUE
router.get("/fetchvenueuser", venueIsLoggedIn, fetchVenueUser);

// UPDATE HALL NAME
router.post("/updatehallname", venueIsLoggedIn, updateHallName);

// UPDATE HALL DESCRIPTION
router.post("/updatehalldescription", venueIsLoggedIn, updateHallDescription);

// UPDATE HALL City
router.post("/updatehallcity", venueIsLoggedIn, updateHallCity);

//UPDATE HALL EMAIL
router.post("/updatehallemail", venueIsLoggedIn, updateHallEmail);

//UPDATE HALL CONTACT
router.post("/updatehallphone", venueIsLoggedIn, updateHallContact);

//UPDATE HALL ADDRESS
router.post("/updatehalladdress", venueIsLoggedIn, updateHallAddress);

//UPDATE HALL CAPACITY
router.post("/updatehallcapacity", venueIsLoggedIn, updateHallCapacity);

//UPDATE HALL Multiday
router.post("/updatehallmultiday", venueIsLoggedIn, updateHallMultiday);

//UPDATE HALL Projector
router.post("/updatehallprojector", venueIsLoggedIn, updateHallProjector);

//UPDATE HALL Broadband
router.post("/updatehallbroadband", venueIsLoggedIn, updateHallBroadband);

//UPDATE HALL Type
router.post("/updatehalltype", venueIsLoggedIn, updateHallType);

//UPDATE HALL OPENING TIME
router.post("/updatehallopeningtime", venueIsLoggedIn, updateHallOpeningTime);

//UPDATE HALL CLOSING TIME
router.post("/updatehallclosingtime", venueIsLoggedIn, updateHallClosingTime);

//UPDATE HALL Time (1st)
router.post("/updatehallTime_1st", venueIsLoggedIn, updateHall_1stHalfTime);

//UPDATE HALL Time (2nd)
router.post("/updatehallTime_2nd", venueIsLoggedIn, updateHall_2ndHalfTime);

//UPDATE HALL Time (full day)
router.post("/updatehallTime_fullday", venueIsLoggedIn, updateHall_fullDayTime);

//UPDATE HALL Price (1st)
router.post("/updatehallPrice_1st", venueIsLoggedIn, updateHall_1stHalfPrice);

//UPDATE HALL Price (2nd)
router.post("/updatehallPrice_2nd", venueIsLoggedIn, updateHall_2ndHalfPrice);

//UPDATE HALL Price (full day)
router.post(
  "/updatehallPrice_fullday",
  venueIsLoggedIn,
  updateHall_fullDayPrice
);

//UPDATE HALL TIME
router.put("/updatehalltiming", venueIsLoggedIn, updateHallTime);

module.exports = router;
