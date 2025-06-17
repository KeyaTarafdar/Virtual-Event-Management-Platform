const express = require("express");
const router = express.Router();
const adminIsLoggedIn = require("../middlewares/adminIsLoggedIn");
const {
  signUp,
  loginAdmin,
  logoutAdmin,
  acceptVenue,
  rejectVenue,
  fetchAdmin,
  fetchAllVenue,
  uploadProfilePicture,
  // updateCompanyName,
  // updateCompanyAddress,
  // updateCompanyContact,
  // updateCompanyEmail,
  // updateCompanyDescription,
  updateCompanyInfo,
  fetchAllEvents,
} = require("../controller/adminController");

router.get("/", (req, res) => {
  res.send("Admin");
});

// ADMIN REGISTER
router.post("/signup", signUp);

// ADMIN LOGIN
router.post("/login", loginAdmin);

// ADMIN LOGOUT
router.get("/logout", adminIsLoggedIn, logoutAdmin);

// UPLOAD PROFILE PICTURE (USING CLOUDINARY)
router.post("/uploadprofilepicture", adminIsLoggedIn, uploadProfilePicture);

// UPDATE PROFILE COMPANY NAME
// router.post("/updatecompanyname", adminIsLoggedIn, updateCompanyName);

// UPDATE PROFILE COMPANY CONTACT
// router.post("/updatecompanycontact", adminIsLoggedIn, updateCompanyContact);

// UPDATE PROFILE COMPANY EMAIL
// router.post("/updatecompanyemail", adminIsLoggedIn, updateCompanyEmail);

// UPDATE PROFILE COMPANY ADDRESS
// router.post("/updatecompanyaddress", adminIsLoggedIn, updateCompanyAddress);

// UPDATE PROFILE COMPANY Info
router.post("/updatecompanyinfo", adminIsLoggedIn, updateCompanyInfo);

// UPDATE PROFILE COMPANY DESCRIPTION
// router.post("/updatecompanydescription",adminIsLoggedIn,updateCompanyDescription);

// FETCH ADMIN
router.get("/fetchadmin", adminIsLoggedIn, fetchAdmin);

// ACCEPT A VENUE
router.post("/acceptvenue", adminIsLoggedIn, acceptVenue);

// ACCEPT A VENUE
router.post("/rejectvenue", adminIsLoggedIn, rejectVenue);

// FETCH ALL VENUE
router.get("/fetchallvenue", adminIsLoggedIn, fetchAllVenue);

// FETCH ALL EVENTS
router.get("/fetchallevents", adminIsLoggedIn, fetchAllEvents);

module.exports = router;
