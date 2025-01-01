const venueModel = require("../models/venueModel");
const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const cloudinary = require("../utils/cloudinary");
const nodemailer = require("nodemailer");
require("dotenv").config();
const axios = require("axios");

// Register Venue
module.exports.signUp = async (req, res) => {
  try {
    let {
      venueName,
      email,
      contact,
      city,
      fullAddress,
      maxCapacity,
      bookingPrice,
      canOrganizeMultidayEvent,
    } = req.body.formData;

    if (
      venueName &&
      city &&
      email &&
      contact &&
      fullAddress &&
      maxCapacity &&
      bookingPrice &&
      (canOrganizeMultidayEvent || !canOrganizeMultidayEvent)
    ) {
      const existingVenue = await venueModel.findOne({ email });
      if (existingVenue) {
        return res.send("Venue already exists. Please Login.");
      }

      // const apiUrl = `https://api.zerobounce.net/v2/validate?api_key=${
      //   process.env.ZEROBONUS_API_KEY
      // }&email=${encodeURIComponent(email)}`;

      // const response = await axios.get(apiUrl);

      // if (response.data.status === "valid") {

      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let password = "";
      for (let i = 0; i < 10; i++) {
        password += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      let venue = await venueModel.create({
        name: venueName,
        email,
        temporaryPassword: password,
        contact,
        address: fullAddress,
        city,
        maxCapacity,
        bookingPrice,
        canOrganizeMultidayEvent,
      });

      await adminModel.updateMany({}, { $push: { appliedVenues: venue._id } });

      res.send("You have successfully applied for Registering your Venue");
      // } else {
      // res.send("Email Address doesn't exists!! Please enter a valid Email Address.")
      // }
    } else {
      res.send("All fields are required.");
    }
  } catch (err) {
    res.send(err.message);
  }
};

// Login
module.exports.loginVenue = async (req, res) => {
  try {
    let token = req.cookies.token;
    if (token) {
      res.send("You are already logged in.");
    } else {
      let { email, password } = req.body;

      if (email && password) {
        let venue = await venueModel.findOne({ email });

        if (venue) {
          if (venue.password) {
            bcrypt.compare(password, venue.password, async (err, result) => {
              if (result) {
                let token = generateToken(venue);
                res.cookie("token", token, {
                  httpOnly: true,
                  secure: false,
                  sameSite: "Lax",
                  path: "/",
                });

                res.send("Login successfully");
              } else {
                res.send("Wrong Password");
              }
            });
          } else if (venue.temporaryPassword == password) {
            let token = generateToken(venue);
            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
              sameSite: "Lax",
              path: "/",
            });

            res.send("Login successfully");
          } else {
            res.send("Wrong Password");
          }
        } else {
          return res.send("Email or Password is wrong");
        }
      } else {
        return res.send("Something is missing");
      }
    }
  } catch (err) {
    return res.send(err.message);
  }
};

// Logout
module.exports.logoutVenue = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
    });
    res.send("Logout successfully");
  } catch (err) {
    res.send("Internal Server Error");
  }
};

// Update Password
module.exports.updatePasswordFirstTime = async (req, res) => {
  try {
    let { venueId, password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    let venue = await venueModel.updateOne(
      { _id: venueId },
      { $set: { password: hashedPassword, temporaryPassword: null } }
    );

    if (venue) {
      res.send("Password Updated Successfully");
    }
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
};

// Fetch Venue User
module.exports.fetchVenueUser = async (req, res) => {
  try {
    let venue = req.venue;
    res.send(venue);
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
};
