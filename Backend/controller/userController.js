const userModel = require("../models/userModel");
const eventModel = require("../models/EventModel");
const venueModel = require("../models/venueModel");
const commentModel = require("../models/commentModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const cloudinary = require("../utils/cloudinary");
require("dotenv").config();
const NodeCache = require("node-cache");
const nodemailer = require("nodemailer");
// const axios = require("axios");

const nodeCache = new NodeCache();

// Register User
module.exports.signUp = async (req, res) => {
  try {
    let { email, password, userName, contactNumber, agreeToTerms } = req.body;

    if (email && password && userName && contactNumber && agreeToTerms) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.send("User already exists. Please Login.");
      }

      // const apiUrl = `https://api.zerobounce.net/v2/validate?api_key=${
      //   process.env.ZEROBONUS_API_KEY
      // }&email=${encodeURIComponent(email)}`;

      // const response = await axios.get(apiUrl);

      // if (response.data.status === "valid") {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser = await userModel.create({
          email,
          password: hashedPassword,
          username: userName,
          contact: contactNumber,
        });

        let token = generateToken(newUser);
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
        });

        res.send("User created successfully");
       //} else {
      //   res.send(
      //     "Email Address does not exists!! Please enter a valid Email Address."
      //   );
      // }
    } 
     else {
      res.send("All fields are required and you must agree to the terms.");
    }
  } catch (err) {
    res.send(err.message);
  }
};

// Login
module.exports.loginUser = async (req, res) => {
  try {
    let token = req.cookies.token;
    if (token) {
      res.send("You are already logged in.");
    } else {
      let { email, password } = req.body;

      if (email && password) {
        let user = await userModel.findOne({ email });

        if (user) {
          bcrypt.compare(password, user.password, async (err, result) => {
            if (result) {
              let token = generateToken(user);
              res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                path: "/",
              });

              user = await user.populate({
                path: "createdEvents appliedEvents",
              });
              nodeCache.set("user", JSON.stringify(user));

              res.send("Login successfully");
            } else {
              res.send("Wrong Password");
            }
          });
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
module.exports.logoutUser = async (req, res) => {
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

// Get Single User
module.exports.getUser = async (req, res) => {
  try {
    if (nodeCache.has("user")) {
      res.send(JSON.parse(nodeCache.get("user")));
    } else {
      let user = req.user;

      await user.populate({
        path: "createdEvents appliedEvents",
      });

      res.send(user);
    }
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
};

// Update Password Request
module.exports.updatePasswordRequest = async (req, res) => {
  try {
    let user = userModel.findOne({ email: req.body.email });
    if (user) {
      res.send(true);
    }
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
};

// Update Password
module.exports.updatePassword = async (req, res) => {
  try {
    let { email, password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user = await userModel.updateOne(
      { email: email.email },
      { $set: { password: hashedPassword } }
    );

    if (user) {
      res.send("Password Updated Successfully");
    }
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
};

// Upload Profile Picture
module.exports.uploadProfilePicture = async (req, res) => {
  try {
    const image = req.body.image;
    const oldImage = req.user.image.public_id;

    const result = await cloudinary.uploader.upload(image, {
      folder: "eventManagement_userProfilePicture",
      width: 300,
      crop: "scale",
    });

    await userModel.updateOne(
      { email: req.user.email },
      {
        $set: {
          image: {
            public_id: result.public_id,
            url: result.secure_url,
          },
        },
      }
    );

    if (oldImage) {
      await cloudinary.uploader.destroy(req.user.image.public_id);
    }
    res.send("File uploaded successfully");
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
};

// Create Event
module.exports.createEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventDate,
      eventEndDate,
      eventTime,
      speakerName,
      city,
      platform,
      description,
      registrationEndDate,
      isPaid,
      headcount,
      paidAmountPerPerson,
      eventType,
      isPublic,
      scannerImage,
      posterImage,
      bill,
      venue1,
      venue2,
      venue3,
    } = req.body.formData;

    if (isPaid && scannerImage === null) {
      return res.send("No Scanner Image uploaded.");
    }

    let scannerResult = null;
    if (scannerImage) {
      scannerResult = await cloudinary.uploader.upload(scannerImage, {
        folder: "eventManagement_scannerImages",
        width: 300,
        crop: "scale",
      });
    }

    const posterResult = await cloudinary.uploader.upload(posterImage, {
      folder: "eventManagement_posterImages",
      width: 300,
      crop: "scale",
    });

    let event = await eventModel.create({
      ownerId: req.user._id,
      eventName,
      date: eventDate,
      eventEndDate,
      time: eventTime,
      speaker: speakerName,
      eventType,
      city,
      venue_1: venue1,
      venue_2: venue3,
      venue_3: venue1,
      platform,
      isPublic,
      isPaid,
      payableAmount: paidAmountPerPerson,
      bill,
      headcount,
      description,
      lastDateOfRegistration: registrationEndDate,
      scannerImage:
        scannerImage !== null
          ? {
              public_id: scannerResult.public_id,
              url: scannerResult.secure_url,
            }
          : null,
      posterImage: {
        public_id: posterResult.public_id,
        url: posterResult.secure_url,
      },
    });

    await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { createdEvents: event._id } }
    );

    const venueIds = [venue1.id, venue2.id, venue3.id];

    await venueModel.updateMany(
      { _id: { $in: venueIds } },
      { $push: { bookingRequests: event._id } }
    );

    res.send("Event created successfully!");
  } catch (error) {
    res.send(error.message);
  }
};

// Fetch All Virtual Events
module.exports.fetchAllVirtualEvents = async (req, res) => {
  try {
    let virtualEvents = await eventModel
      .find({ eventType: "virtual" })
      .populate({ path: "ownerId" });
    res.send(virtualEvents);
  } catch (err) {
    res.send(err.message);
  }
};

// Fetch All In_person Events
module.exports.fetchAllIn_PersonEvents = async (req, res) => {
  try {
    let in_personEvents = await eventModel
      .find({ eventType: "in_person" })
      .populate({ path: "ownerId" });
    res.send(in_personEvents);
  } catch (err) {
    res.send(err.message);
  }
};

// Fetch All Hybrid Events
module.exports.fetchAllHybridEvents = async (req, res) => {
  try {
    let hybridEvents = await eventModel
      .find({ eventType: "hybrid" })
      .populate({ path: "ownerId" });
    res.send(hybridEvents);
  } catch (err) {
    res.send(err.message);
  }
};

// Fetch Single Event
module.exports.fetchSingleEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    let event = await eventModel
      .findOne({ _id: eventId })
      .populate({ path: "ownerId" });

    res.send(event);
  } catch (err) {
    res.send(err.message);
  }
};

// Fetch Last Created Event
module.exports.fetchLastCreatedEvent = async (req, res) => {
  try {
    const lastEvent = await eventModel.find();
    if (lastEvent.length !== 0) {
      res.send(lastEvent[lastEvent.length - 1]);
    } else {
      res.send("No Event Created!");
    }
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

// Event Registration
module.exports.eventRegistration = async (req, res) => {
  try {
    const { eventId } = req.body;
    const user = req.user;

    const event = await eventModel.findOne({ _id: eventId });

    if (event.registeredUser && event.registeredUser.includes(user._id)) {
      res.send("User already registered in the event");
    } else {
      const formattedDate = new Date(event.date).toLocaleDateString("en-GB");

      const timeParts = event.time.split(":");
      let hours = parseInt(timeParts[0], 10);
      const minutes = timeParts[1];
      const period = hours < 12 ? "AM" : "PM";

      hours = hours % 12 || 12;

      const formattedTime = `${hours}:${minutes} ${period}`;

      const testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: process.env.user,
          pass: process.env.pass,
        },
      });

      let info = await transporter.sendMail({
        from: '"Eventek" <eventek@gmail.com>',
        to: user.email,
        subject: "Registration successfull",
        text: `Your registration is successfull in the event ${event.eventName}`,
        html: `Your registration is successfull in the event <b>${event.eventName}</b>.<br> <b>Date:</b> ${formattedDate} <br> <b>Time:</b> ${formattedTime}`,
      });

      await userModel.findOneAndUpdate(
        { email: user.email },
        { $push: { appliedEvents: eventId } }
      );

      await eventModel.findOneAndUpdate(
        { _id: eventId },
        {
          $push: { registeredUser: user._id },
          $set: {
            tillNowTotalRegistration: 1,
          },
        }
      );

      res.send("Registration successfull");
    }
  } catch (err) {
    res.send(err.message);
  }
};

// Check a User is Registered in Event or Not
module.exports.checkUserIsRegisteredInEventOrNot = async (req, res) => {
  try {
    const { eventId } = req.body;
    const user = req.user;
    const appliedEvents = user.appliedEvents;

    if (appliedEvents.includes(eventId)) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    res.send(err.message);
  }
};

// Fetch All Venue
module.exports.fetchAllVenue = async (req, res) => {
  try {
    const venues = await venueModel.find();
    // const venues = await venueModel.find({ isCompleteProfile: true });
    res.send(venues);
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
};

// Comment on a particular event
module.exports.commentOnAEvent = async (req, res) => {
  try {
    let user = req.user;
    let { eventId, comment } = req.body;

    await commentModel.create({
      userId: user._id,
      eventId,
      commentBody: comment,
    });

    res.send("Comment added");
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
};

// Reply a Comment
module.exports.replyAComment = async (req, res) => {
  try {
    let user = req.user;
    let { eventId, reply, commentId } = req.body;

    let replyComment = await commentModel.create({
      userId: user._id,
      eventId,
      commentBody: reply,
    });

    await commentModel.findOneAndUpdate(
      {
        _id: commentId,
      },
      { $push: { reply: replyComment._id } }
    );

    res.send("Replied to a comment");
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
};

// Like a Comment
module.exports.commentOnAEvent = async (req, res) => {
  try {
    let user = req.user;
    let { commentId } = req.body;

    await commentModel.findOneAndUpdate(
      {
        _id: commentId,
      },
      { $push: { likeCount: user._id } }
    );

    res.send("Liked");
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
};

// Remove Like from a Comment
module.exports.commentOnAEvent = async (req, res) => {
  try {
    let user = req.user;
    let { commentId } = req.body;

    await commentModel.findOneAndUpdate(
      {
        _id: commentId,
      },
      { $pull: { likeCount: user._id } }
    );

    res.send("Like Removed");
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
};
