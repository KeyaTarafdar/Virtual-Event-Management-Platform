const venueModel = require("../models/venueModel");
const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const cloudinary = require("../utils/cloudinary");
const nodemailer = require("nodemailer");
require("dotenv").config();
const axios = require("axios");
const eventModel = require("../models/eventModel");
const { formateDate } = require("../utils/helper");
const {
  errorResponse_badRequest,
  errorResponse_catchError,
  successResponse_ok,
} = require("../responseObject");

// Register Venue
module.exports.signUp = async (req, res) => {
  try {
    let {
      venueName,
      owner,
      email,
      contact,
      city,
      fullAddress,
      maxCapacity,
      canOrganizeMultidayEvent,
    } = req.body;

    if (
      venueName &&
      city &&
      email &&
      contact &&
      fullAddress &&
      maxCapacity &&
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
        ownerName: owner,
        email,
        temporaryPassword: password,
        contact,
        address: fullAddress,
        city,
        maxCapacity,
        canOrganizeMultidayEvent,
      });

      await adminModel.updateMany({}, { $push: { appliedVenues: venue._id } });

      return successResponse_ok(
        res,
        "You have successfully applied for Registering your Venue",
        venue
      );
      // } else {
      // res.send("Email Address doesn't exists!! Please enter a valid Email Address.")
      // }
    } else {
      return errorResponse_badRequest(res);
    }
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// Upload venue Profile Picture
module.exports.uploadVenueProfilePicture = async (req, res) => {
  try {
    const image = req.body.image;
    const oldImage = req.venue.profilepicture
      ? req.venue.profilepicture.public_id
      : null;

    const result = await cloudinary.uploader.upload(image, {
      folder: "eventManagement_venueProfilePicture",
      width: 300,
      crop: "scale",
    });

    const venue = await venueModel.updateOne(
      { email: req.venue.email },
      {
        $set: {
          profilepicture: {
            public_id: result.public_id,
            url: result.secure_url,
          },
        },
      }
    );

    if (oldImage) {
      await cloudinary.uploader.destroy(oldImage);
    }
    return successResponse_ok(res, "File uploaded successfully", venue);
  } catch (err) {
    return errorResponse_catchError(res, err.message);
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
                return successResponse_ok(res, "Login successfull");
              } else {
                return res.send({ success: false, message: "Wrong Password" });
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

            return successResponse_ok(res, "Login successfull");
          } else {
            return res.send({ success: false, message: "Wrong Password" });
          }
        } else {
          return res.send({
            success: false,
            message: "Email or Password is wrong",
          });
        }
      } else {
        return errorResponse_badRequest(res);
      }
    }
  } catch (err) {
    return errorResponse_catchError(res, err.message);
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
    console.log(err.message);
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
      return successResponse_ok(res, "Password Updated Successfully", null);
    }
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// Fetch Venue User
module.exports.fetchVenueUser = async (req, res) => {
  try {
    let venue = req.venue;
    await venue.populate([
      {
        path: "bookingRequests.id",
        model: "event",
        populate: { path: "ownerId" },
      },
      { path: "bookedEvents" },
    ]);

    return successResponse_ok(res, "Venue fetched", venue);
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// Update Hall Name
module.exports.updateHallName = async (req, res) => {
  try {
    let { newHallName } = req.body;
    let venue = req.venue;

    await venueModel.updateOne(
      { email: venue.email },
      { $set: { name: newHallName } }
    );
    res.send("Hallname updated");
  } catch (err) {
    res.send(err.message);
  }
};

// Update Hall City
module.exports.updateHallCity = async (req, res) => {
  try {
    let { newHallCity } = req.body;
    let venue = req.venue;

    await venueModel.updateOne(
      { email: venue.email },
      { $set: { city: newHallCity } }
    );
    res.send("Hall City updated");
  } catch (err) {
    res.send(err.message);
  }
};

// Update Hall Email
module.exports.updateHallEmail = async (req, res) => {
  try {
    let { newHallEmail } = req.body;
    let venue = req.venue;

    venueModel
      .updateOne({ email: venue.email }, { $set: { email: newHallEmail } })
      .then((response) => {
        res.cookie("token", "", {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
          path: "/",
        });

        let updatedVenue = { ...venue, email: newHallEmail };
        let token = generateToken(updatedVenue);

        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
          path: "/",
        });

        res.send("Hall Email updated");
      })
      .catch((err) => {
        res.send(err.message);
      });
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

// Update Hall Contact
module.exports.updateHallContact = async (req, res) => {
  try {
    let { newHallPhone } = req.body;
    let venue = req.venue;

    await venueModel.updateOne(
      { email: venue.email },
      { $set: { contact: newHallPhone } }
    );
    res.send("Hall contact updated");
  } catch (err) {
    res.send(err.message);
  }
};

// Update Hall Address
module.exports.updateHallAddress = async (req, res) => {
  try {
    let { newHallAddress } = req.body;
    let venue = req.venue;

    await venueModel.updateOne(
      { email: venue.email },
      { $set: { address: newHallAddress } }
    );
    res.send("Hall address updated");
  } catch (err) {
    res.send(err.message);
  }
};

// Update Hall Capacity
module.exports.updateHallCapacity = async (req, res) => {
  try {
    let { newHallCapacity } = req.body;
    let venue = req.venue;

    await venueModel.updateOne(
      { email: venue.email },
      { $set: { maxCapacity: newHallCapacity } }
    );
    res.send("Hall capacity updated");
  } catch (err) {
    res.send(err.message);
  }
};

// Update Hall Multiday
module.exports.updateHallMultiday = async (req, res) => {
  try {
    let { newHallCapacity } = req.body;
    let venue = req.venue;

    await venueModel.updateOne(
      { email: venue.email },
      { $set: { canOrganizeMultidayEvent: newHallCapacity } }
    );
    res.send("Hall Multiday Fecility updated");
  } catch (err) {
    res.send(err.message);
  }
};

// Update Hall timing
module.exports.updateHallTime = async (req, res) => {
  try {
    const {
      time_1stHalf,
      bookingPrice_1stHalf,
      time_2ndHalf,
      bookingPrice_2ndHalf,
      time_fullDay,
      bookingPrice_fullDay,
    } = req.body;
    const { _id } = req.venue;
    const venue = await venueModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          time_1stHalf,
          bookingPrice_1stHalf,
          time_2ndHalf,
          bookingPrice_2ndHalf,
          time_fullDay,
          bookingPrice_fullDay,
        },
      },
      { new: true }
    );

    res
      .status(200)
      .send({ success: true, message: "Venue details updated", data: venue });
  } catch (err) {
    res.send(err.message);
  }
};

// Accept event request
module.exports.acceptEvent = async (req, res) => {
  try {
    const { eventId, timeslot } = req.body;
    const event = await eventModel.findOne({ _id: eventId });
    let venue = req.venue;
    if (event) {
      event.venues = [{ id: venue.id, timeslot }];
      event.isVenueConfirmed = true;
      await event.save();
    }

    await venueModel.findOneAndUpdate({ _id: venue._id }, {});

    const { _id } = req.vneue;
  } catch (err) {
    res.status(500).send(err.message);
  }
};
