const userModel = require("../models/userModel");
const eventModel = require("../models/eventModel");
const venueModel = require("../models/venueModel");
const commentModel = require("../models/commentModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const cloudinary = require("../utils/cloudinary");
require("dotenv").config();
const NodeCache = require("node-cache");
const sgMail = require("@sendgrid/mail");
const Razorpay = require("razorpay");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const {
  successResponse_ok,
  successResponse_created,
  errorResponse_alreadyExists,
  errorResponse_catchError,
  errorResponse_notFound,
  errorResponse_badRequest,
} = require("../responseObject/index");

const nodeCache = new NodeCache();

const razorpay = new Razorpay({
  key_id: process.env.REZORPAY_ID,
  key_secret: process.env.REZORPAY_KEY_SCERET,
});

// Register User
module.exports.signUp = async (req, res) => {
  try {
    let { email, password, userName, contactNumber, agreeToTerms } = req.body;

    if (email && password && userName && contactNumber && agreeToTerms) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return errorResponse_alreadyExists(res, "User Already exists");
      }
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

      return successResponse_created(res, "User Created Successfully", newUser);
    } else {
      return errorResponse_badRequest(res);
    }
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// Login
module.exports.loginUser = async (req, res) => {
  try {
    let token = req.cookies.token;
    if (token) {
      return errorResponse_alreadyExists(res, "You are already loggedin");
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

              return successResponse_ok(res, "User login successfull", user);
            } else {
              return errorResponse_notFound(res, "Wrong Password");
            }
          });
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
module.exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
    });
    return successResponse_ok(res, "Logout successfully", null);
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// Get Single User
module.exports.getUser = async (req, res) => {
  try {
    let user = req.user;

    await user.populate({
      path: "createdEvents appliedEvents",
    });
    return successResponse_ok(res, "User fetched", user);
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// Update Password Request
module.exports.updatePasswordRequest = async (req, res) => {
  try {
    let user = userModel.findOne({ email: req.body.email });
    if (user) {
      return successResponse_ok(res, "", true)
    }
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// Update Password
module.exports.updatePassword = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log("email", email);
    console.log("password", password);

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    let user = userModel.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } }
    );
    console.log("user", user);

    if (user) {
      return successResponse_ok(res, "Password Updated Successfully", null);
    }
  } catch (err) {
    return errorResponse_catchError(res, err.message);
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

    const user = await userModel
      .updateOne(
        { email: req.user.email },
        {
          $set: {
            image: {
              public_id: result.public_id,
              url: result.secure_url,
            },
          },
        },
        { new: true }
      )
      .populate({ path: "createdEvents appliedEvents pastEvents" });

    if (oldImage) {
      await cloudinary.uploader.destroy(req.user.image.public_id);
    }
    return successResponse_ok(res, "File uploaded successfully", user);
  } catch (err) {
    return errorResponse_catchError(res, err.message);
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
      venue_2: venue2,
      venue_3: venue3,
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

    const venueUpdates = [
      { id: venue1.id, timeslot: venue1.timeslot },
      { id: venue2.id, timeslot: venue2.timeslot },
      { id: venue3.id, timeslot: venue3.timeslot },
    ];

    for (const venue of venueUpdates) {
      await venueModel.findOneAndUpdate(
        { _id: venue.id },
        {
          $push: {
            bookingRequests: {
              id: event._id,
              timeslot: venue.timeslot,
            },
          },
        }
      );
    }

    return successResponse_created(res, "Event created successfully!", event);
  } catch (error) {
    return errorResponse_catchError(res, err.message);
  }
};

// Fetch All Virtual Events
module.exports.fetchAllVirtualEvents = async (req, res) => {
  try {
    let virtualEvents = await eventModel
      .find({ eventType: "virtual" })
      .populate({ path: "ownerId" });
    let upcomingEvents = virtualEvents.filter(
      (event) => new Date(event.date) >= Date.now()
    );
    return successResponse_ok(
      res,
      "All virtual events fetched",
      upcomingEvents
    );
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// Fetch All In_person Events
module.exports.fetchAllIn_PersonEvents = async (req, res) => {
  try {
    let in_personEvents = await eventModel
      .find({ eventType: "in_person" })
      .populate({ path: "ownerId" });
    let upcomingEvents = in_personEvents.filter(
      (event) => new Date(event.date) >= Date.now()
    );
    return successResponse_ok(
      res,
      "All In-person events fetched",
      upcomingEvents
    );
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// Fetch All Hybrid Events
module.exports.fetchAllHybridEvents = async (req, res) => {
  try {
    let hybridEvents = await eventModel
      .find({ eventType: "hybrid" })
      .populate({ path: "ownerId" });
    let upcomingEvents = hybridEvents.filter(
      (event) => new Date(event.date) >= Date.now()
    );
    return successResponse_ok(res, "All Hybrid events fetched", upcomingEvents);
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// Fetch Single Event
module.exports.fetchSingleEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    let event = await eventModel
      .findOne({ _id: eventId })
      .populate({ path: "ownerId" });

    return successResponse_ok(res, "Event fetched", event);
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// Fetch Last Created Event
module.exports.fetchLastCreatedEvent = async (req, res) => {
  try {
    const lastEvent = await eventModel.find();
    if (
      lastEvent.length !== 0 &&
      new Date(lastEvent[lastEvent.length - 1].date) >= Date.now()
    ) {
      return successResponse_ok(
        res,
        "Last event fetched",
        lastEvent[lastEvent.length - 1]
      );
    } else {
      return errorResponse_notFound(res, "No Event Created!");
    }
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// Event Registration
module.exports.eventRegistration = async (req, res) => {
  try {
    const { eventId } = req.body;
    let user = req.user;

    const event = await eventModel.findOne({ _id: eventId });

    if (event.registeredUser && event.registeredUser.includes(user._id)) {
      return errorResponse_alreadyExists(
        res,
        "User already registered in the event"
      );
    } else {
      const formattedDate = new Date(event.date).toLocaleDateString("en-GB");

      const timeParts = event.time.split(":");
      let hours = parseInt(timeParts[0], 10);
      const minutes = timeParts[1];
      const period = hours < 12 ? "AM" : "PM";

      hours = hours % 12 || 12;

      const formattedTime = `${hours}:${minutes} ${period}`;

      // const testAccount = await nodemailer.createTestAccount();

      // const transporter = nodemailer.createTransport({
      //   host: "smtp.ethereal.email",
      //   port: 587,
      //   auth: {
      //     user: process.env.user,
      //     pass: process.env.pass,
      //   },
      // });

      // let info = await transporter.sendMail({
      //   from: '"Eventek" <eventek@gmail.com>',
      //   to: user.email,
      //   subject: "Registration successfull",
      //   text: `Your registration is successfull in the event ${event.eventName}`,
      //   html: `Your registration is successfull in the event <b>${event.eventName}</b>.<br> <b>Date:</b> ${formattedDate} <br> <b>Time:</b> ${formattedTime}`,
      // });

      const msg = {
        to: user.email,
        from: "eventek@gmail.com",
        subject: "Registration Successful",
        text: `Your registration is successful in the event ${event.eventName}`,
        html: `
          <p>Your registration is successful in the event <strong>${event.eventName}</strong>.</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${formattedTime}</p>
        `,
      };

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      await sgMail.send(msg);

      user = await userModel.findOneAndUpdate(
        { email: user.email },
        { $push: { appliedEvents: eventId } },
        { new: true }
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

      return successResponse_ok(res, "Registration successfull", user);
    }
  } catch (err) {
    return errorResponse_catchError(res, err.message);
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
    return errorResponse_catchError(res, err.message);
  }
};

// Fetch All Venue
module.exports.fetchAllVenue = async (req, res) => {
  try {
    const venues = await venueModel.find();
    return successResponse_ok(res, "All venues fetched", venues);
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// Comment on a particular event
module.exports.commentOnAnEvent = async (req, res) => {
  try {
    let user = req.user;
    let { eventId, comment } = req.body;

    comment = await commentModel.create({
      userId: user._id,
      eventId,
      commentBody: comment,
    });

    return successResponse_ok(res, "Comment added", comment);
  } catch (err) {
    return errorResponse_catchError(res, err.message);
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

    const comment = await commentModel.findOneAndUpdate(
      {
        _id: commentId,
      },
      { $push: { reply: replyComment._id } },
      { new: true }
    );

    await comment.populate({ path: "reply" });

    return successResponse_ok(res, "Replied to a comment", comment);
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// Like a Comment
module.exports.likeComment = async (req, res) => {
  try {
    let user = req.user;
    let { commentId } = req.body;

    const comment = await commentModel.findOneAndUpdate(
      {
        _id: commentId,
      },
      { $push: { likeCount: user._id } },
      { new: true }
    );

    return successResponse_ok(res, "Liked", comment);
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// Remove Like from a Comment
module.exports.removeLikeFromComment = async (req, res) => {
  try {
    let user = req.user;
    let { commentId } = req.body;

    const comment = await commentModel.findOneAndUpdate(
      {
        _id: commentId,
      },
      { $pull: { likeCount: user._id } },
      { new: true }
    );

    return successResponse_ok(res, "Like Removed", comment);
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// CREATE RAZORPAY ORDER
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    const options = {
      amount: amount * 100,
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);
    return res.json({
      success: true,
      message: "Razorpay order created",
      order: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// VERIFY RAZORPAY PAYMENT
exports.verifyRazorpayPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const secret = process.env.REZORPAY_KEY_SECRET || "";

  // Generate a HMAC SHA256 hash
  const crypto = require("crypto");
  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  // Check if the generated signature matches the received signature
  if (generated_signature === razorpay_signature) {
    // If valid, update the payment status and user registration

    // Update user payment information
    await userModel.findByIdAndUpdate(req.body.userId, {
      $push: {
        appliedEvents: req.body.eventId,
        payments: {
          eventId: req.body.eventId,
          paymentId: razorpay_payment_id,
          amount: req.body.amount,
          status: "completed",
        },
      },
    });

    // Update event registration details
    await eventModel.findByIdAndUpdate(req.body.eventId, {
      $push: { registeredUser: req.body.userId },
    });

    return res.json({
      success: true,
      message: "Payment verified successfully",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid signature, payment verification failed",
    });
  }
};

// FETCH ALL VENUES BASED ON VENUE
exports.fetchAllVenueBasedOnCity = async (req, res) => {
  try {
    const { city } = req.body;
    const venues = await venueModel.find({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    });
    return successResponse_ok(res, "Venue fetched", venues);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
