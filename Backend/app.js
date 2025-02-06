const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
const venueRouter = require("./routes/venueRouter");
const commonRouter = require("./routes/commonRouter");
const companyModel = require("./models/companyModel");
require("dotenv").config();
require("./config/mongoose-connection");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/createcompany", async (req, res) => {
  try {
    let {
      companyName,
      email,
      contact,
      description,
      linkedinLink,
      instaLink,
      fbLink,
    } = req.body;
    await companyModel.deleteMany({});
    await companyModel.create({
      companyName,
      email,
      contact,
      description,
      linkedinLink,
      instaLink,
      fbLink,
    });
    res.send("Company Created");
  } catch (err) {
    res.send(err.message);
  }
});

app.get("/fetchcompanydetails", async (req, res) => {
  try {
    let company = await companyModel.find();
    res.status(200).send(company[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.use("/admins", adminRouter);
app.use("/users", userRouter);
app.use("/venue", venueRouter);
app.use("/commonroute", commonRouter);

app.listen(8000);
