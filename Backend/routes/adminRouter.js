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
  uploadCompanyName,
  uploadCompanyAddress,
  uploadCompanyContact,
  uploadCompanyEmail,
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

// UPLOAD PROFILE COMPANY NAME
router.post("/uploadcompanyname", adminIsLoggedIn, uploadCompanyName);

// UPLOAD PROFILE COMPANY CONTACT
router.post("/uploadcompanycontact", adminIsLoggedIn, uploadCompanyContact);

// UPLOAD PROFILE COMPANY EMAIL
router.post("/uploadcompanyemail", adminIsLoggedIn, uploadCompanyEmail);

// UPLOAD PROFILE COMPANY ADDRESS
router.post("/uploadcompanyaddress", adminIsLoggedIn, uploadCompanyAddress);

//  FETCH ADMIN
router.get("/fetchadmin", adminIsLoggedIn, fetchAdmin);

// ACCEPT A VENUE
router.post("/acceptvenue", adminIsLoggedIn, acceptVenue);

// ACCEPT A VENUE
router.post("/rejectvenue", adminIsLoggedIn, rejectVenue);

// FETCH ALL VENUE
router.get("/fetchallvenue", adminIsLoggedIn, fetchAllVenue);

module.exports = router;
