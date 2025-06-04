const express = require("express");
const router = express.Router();
const commonIsLoggedIn = require("../middlewares/commonIsLoggedIn");
const { logout } = require("../controller/commonController");

// LOGOUT
router.get("/logout", commonIsLoggedIn, logout);

module.exports = router;
