// *adminsRouter.js*
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

//  FETCH ADMIN
router.get("/fetchadmin", adminIsLoggedIn, fetchAdmin);

// ACCEPT A VENUE
router.post("/acceptvenue", adminIsLoggedIn, acceptVenue);

// ACCEPT A VENUE
router.post("/rejectvenue", adminIsLoggedIn, rejectVenue);

module.exports = router;
