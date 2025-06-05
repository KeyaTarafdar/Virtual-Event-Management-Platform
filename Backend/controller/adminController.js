const {
  adminModel,
  venueModel,
  userModel,
  eventModel,
  companyModel,
} = require("../models/index");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const cloudinary = require("../utils/cloudinary");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const {
  errorResponse_badRequest,
  errorResponse_catchError,
  successResponse_ok,
  errorResponse_alreadyExists,
} = require("../responseObject");
require("dotenv").config();

// Register Admin
module.exports.signUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    let admin = await adminModel.find({});
    if (admin.length > 0) {
      res.send("Admin already exists! Please login");
    } else {
      if (username && email && password) {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        await adminModel.create({
          email,
          password: hashedPassword,
          username,
        });

        res.send("Admin created successfully");
      } else {
        res.send("All fields are required and you must agree to the terms.");
      }
    }
  } catch (err) {
    res.send(err.message);
  }
};

// Login Admin
module.exports.loginAdmin = async (req, res) => {
  try {
    let token = req.cookies.token;

    if (token) {
      return errorResponse_alreadyExists(res, "You are already logged in");
    } else {
      let { email, password } = req.body;

      if (email && password) {
        let admin = await adminModel.findOne({ email });

        if (admin) {
          bcrypt.compare(password, admin.password, async (err, result) => {
            if (result) {
              let token = generateToken(admin);
              res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                path: "/",
              });
              await admin.populate({ path: "appliedVenues" });
              return successResponse_ok(res, "Admin login successfull", admin);
            } else {
              return res.send({ success: false, message: "Wrong Password" });
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

// Logout Admin
module.exports.logoutAdmin = async (req, res) => {
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

// Upload Profile Picture
module.exports.uploadProfilePicture = async (req, res) => {
  try {
    const image = req.body.image;
    const oldImage = req.admin.image.public_id;

    const result = await cloudinary.uploader.upload(image, {
      folder: "eventManagement_adminProfilePicture",
      width: 128,
      height: 128,
      crop: "fill",
      gravity: "face",
    });

    const admin = await adminModel.findOneAndUpdate(
      { email: req.admin.email },
      {
        $set: {
          image: {
            public_id: result.public_id,
            url: result.secure_url,
          },
        },
      },
      { new: true }
    );

    if (oldImage) {
      await cloudinary.uploader.destroy(oldImage);
    }
    return successResponse_ok(res, "File uploaded successfully", admin);
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};

// Update Company Name
// module.exports.updateCompanyName = async (req, res) => {
//   try {
//     const { companyName } = req.body;
//     let company = await companyModel.updateMany({ companyName }, { new: true });

//     return successResponse_ok(
//       res,
//       "Company name updated successfully",
//       company[0]
//     );
//   } catch (error) {
//     return errorResponse_catchError(res, err.message);
//   }
// };

// Update Company Contact
// module.exports.updateCompanyContact = async (req, res) => {
//   try {
//     const { contact } = req.body;
//     let company = await companyModel.updateMany({ contact }, { new: true });

//     return successResponse_ok(
//       res,
//       "Company contact updated successfully",
//       company[0]
//     );
//   } catch (error) {
//     return errorResponse_catchError(res, err.message);
//   }
// };

// Update Company Email
// module.exports.updateCompanyEmail = async (req, res) => {
//   try {
//     const { email } = req.body;
//     let company = await companyModel.updateMany({ email }, { new: true });

//     return successResponse_ok(
//       res,
//       "Company email updated successfully",
//       company[0]
//     );
//   } catch (error) {
//     return errorResponse_catchError(res, err.message);
//   }
// };

// Update Company Address
// module.exports.updateCompanyAddress = async (req, res) => {
//   try {
//     const { address } = req.body;
//     let company = await companyModel.updateMany({ address }, { new: true });

//     return successResponse_ok(
//       res,
//       "Company address updated successfully",
//       company[0]
//     );
//   } catch (error) {
//     return errorResponse_catchError(res, err.message);
//   }
// };

// Update Company Description
// module.exports.updateCompanyDescription = async (req, res) => {
//   try {
//     const { description } = req.body;
//     let company = await companyModel.updateMany({ description }, { new: true });

//     return successResponse_ok(
//       res,
//       "Company description updated successfully",
//       company[0]
//     );
//   } catch (error) {
//     return errorResponse_catchError(res, err.message);
//   }
// };

// Update Company Info
module.exports.updateCompanyInfo = async (req, res) => {
  try {
    const { companyName, address, email, contact, description } = req.body;
    let company = await companyModel.updateMany(
      { companyName, address, email, contact, description },
      { new: true }
    );

    return successResponse_ok(
      res,
      "Company info updated successfully",
      company[0]
    );
  } catch (error) {
    return errorResponse_catchError(res, err.message);
  }
};

// Fetch Admin
module.exports.fetchAdmin = async (req, res) => {
  try {
    const admin = req.admin;
    await admin.populate({ path: "appliedVenues" });
    return successResponse_ok(res, "Admin fetched successfully", admin);
  } catch (err) {
    res.send("Internal Server Error");
  }
};

// Accept a Venue
module.exports.acceptVenue = async (req, res) => {
  try {
    const { venueId } = req.body;
    let venue = await venueModel.findOneAndUpdate(
      { _id: venueId },
      { $set: { acceptedByAdmin: true } }
    );
    await adminModel.updateMany({}, { $pull: { appliedVenues: venueId } });

    await userModel.findOneAndDelete({ email: venue.email });

    //const testAccount = await nodemailer.createTestAccount();

    // const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   auth: {
    //     user: process.env.user,
    //     pass: process.env.pass,
    //   },
    // });

    //     await transporter.sendMail({
    //       from: '"Eventek" <eventek@gmail.com>',
    //       to: venue.email,
    //       subject: "Application accepted",
    //       html: `<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9; color: #333;">
    //     <div style=" margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border: 1px solid #ddd;">
    //         <div style="background-color: #4CAF50; color: #ffffff; padding: 15px; border-radius: 8px 8px 0 0; text-align: center;">
    //             <h2 style="margin: 0;">Venue Application Approved</h2>
    //         </div>
    //         <div style="padding: 20px;">
    //             <p>Dear ${venue.name},</p>
    //             <p>We are pleased to inform you that your venue application has been <strong>approved</strong>! Congratulations on joining our platform. Your venue will soon be available for event creators to explore and book.</p>
    //             <p>To ensure smooth operation and maximize your visibility, we kindly request you to complete your profile to 100%. A fully completed profile helps event creators make informed decisions and enhances your chances of securing bookings.</p>
    //             <p><strong>Your login credentials are as follows:</strong></p>
    //             <ul style="padding-left: 20px;">
    //                 <li><b>Email:</b> ${venue.email}</li>
    //                 <li><b>Password:</b> ${venue.temporaryPassword}</li>
    //             </ul>
    //             <p><strong>Note:</strong> For your security, please change your password immediately after your first login.</p>
    //             <div style="text-align: center; margin-top: 20px;">
    //                 <a href="http://localhost:5173/resetpassword/${venueId}" target="_blank"
    //                    style="background-color: #007BFF; color: #ffffff; text-decoration: none; padding: 10px 20px; font-size: 20px; border-radius: 8px; display: inline-block; cursor: pointer;">Change Password</a>
    //             </div>
    //             <p style="margin-top: 20px;">If you have any questions or need assistance, feel free to contact our support team. We are here to help you make the most of our platform.</p>
    //             <p>Once again, welcome aboard! We look forward to a successful partnership.</p>
    //         </div>
    //         <div style="margin-top: 20px; font-size: 14px; color: #777; text-align: center; padding: 10px 0; border-top: 1px solid #ddd;">
    //             <p>Warm regards,<br>The Eventek Team</p>
    //             <p><i>Your success is our priority.</i></p>
    //         </div>
    //     </div>
    // </body>`,
    //     });

    if (!process.env.SENDGRID_API_KEY) {
      return res.status(500).send("SendGrid API key not configured.");
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    await sgMail.send({
      to: venue.email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: "Venue Approved",
      html: `<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9; color: #333;">
        <div style=" margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border: 1px solid #ddd;">
            <div style="background-color: #4CAF50; color: #ffffff; padding: 15px; border-radius: 8px 8px 0 0; text-align: center;">
                <h2 style="margin: 0;">Venue Application Approved</h2>
            </div>
            <div style="padding: 20px;">
                <p>Dear ${venue.name},</p>
                <p>We are pleased to inform you that your venue application has been <strong>approved</strong>! Congratulations on joining our platform. Your venue will soon be available for event creators to explore and book.</p>
                <p>To ensure smooth operation and maximize your visibility, we kindly request you to complete your profile to 100%. A fully completed profile helps event creators make informed decisions and enhances your chances of securing bookings.</p>
                <p><strong>Your login credentials are as follows:</strong></p>
                <ul style="padding-left: 20px;">
                    <li><b>Email:</b> ${venue.email}</li>
                    <li><b>Password:</b> ${venue.temporaryPassword}</li>
                </ul>
                <p><strong>Note:</strong> For your security, please change your password immediately after your first login.</p>
                <div style="text-align: center; margin-top: 20px;">
                    <a href="http://localhost:5173/resetpassword/${venueId}" target="_blank" 
                       style="background-color: #007BFF; color: #ffffff; text-decoration: none; padding: 10px 20px; font-size: 20px; border-radius: 8px; display: inline-block; cursor: pointer;">Change Password</a>
                </div>
                <p style="margin-top: 20px;">If you have any questions or need assistance, feel free to contact our support team. We are here to help you make the most of our platform.</p>
                <p>Once again, welcome aboard! We look forward to a successful partnership.</p>
            </div>
            <div style="margin-top: 20px; font-size: 14px; color: #777; text-align: center; padding: 10px 0; border-top: 1px solid #ddd;">
                <p>Warm regards,<br>The Eventek Team</p>
                <p><i>Your success is our priority.</i></p>
            </div>
        </div>
    </body>`,
    });
    res.send("Venue is added and email sent.");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Reject a Venue
module.exports.rejectVenue = async (req, res) => {
  try {
    const { venueId, reason } = req.body;
    let venue = await venueModel.findOneAndDelete({ _id: venueId });
    await adminModel.updateMany({}, { $pull: { appliedVenues: venueId } });

    //const testAccount = await nodemailer.createTestAccount();

    // const transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   auth: {
    //     user: process.env.user,
    //     pass: process.env.pass,
    //   },
    // });

    await sgMail.send({
      to: venue.email,
      from: '"Eventek" <eventek@gmail.com>',
      subject: "Venue Application rejected",
      html: `<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f9f9f9; color: #333;">
    <div style="margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border: 1px solid #ddd;">
        <div style="background-color: #f6440e; color: #ffffff; padding: 15px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="margin: 0;">Venue Application Rejected</h2>
        </div>
        <div style="padding: 20px;">
            <p>Dear ${venue.name},</p>
            <p>We regret to inform you that your venue application has been <strong>rejected</strong> after careful review. Unfortunately, it did not meet all the necessary criteria for approval.</p>
            
            <p style="background-color: #FFF4E5; color: #D84315; padding: 10px; border-left: 4px solid #FF5722; margin: 20px 0; border-radius: 4px;">
                <strong>Reason for Rejection:</strong> ${reason}
            </p>

            <p>We encourage you to review your application and make the necessary improvements or provide additional documentation if applicable. You are welcome to reapply once the required changes have been made.</p>
            <p>If you would like more details about the reasons for rejection or need assistance, feel free to contact our support team. We are here to help you through the process and provide any guidance you may need.</p>
            <p>Thank you for your interest in our platform. We appreciate the effort you put into your application and hope to see you again in the future.</p>
        </div>
        <div style="margin-top: 20px; font-size: 14px; color: #777; text-align: center; padding: 10px 0; border-top: 1px solid #ddd;">
            <p>Warm regards,<br>The Eventek Team</p>
            <p><i>Your success is our priority.</i></p>
        </div>
    </div>
</body>`,
    });

    res.send("Venue is rejected");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Fetch All Venue
module.exports.fetchAllVenue = async (req, res) => {
  try {
    let events = await eventModel.find();
    res.send(events);
  } catch (err) {
    res.send(err.message);
  }
};
