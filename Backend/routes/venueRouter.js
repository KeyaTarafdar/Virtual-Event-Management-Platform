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

module.exports = router;
