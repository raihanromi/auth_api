const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly } = require("./middlewares/auth");
const userprofileRoute = require("./routes/userProfileRoute");
require("dotenv").config();

//now we can use use json file
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// set the view engine to ejs
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/singup", (req, res) => {
  res.render("singup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

//routes
app.use("/user", userRoute);

app.use("/userprofile", restrictToLoggedinUserOnly, userprofileRoute);

mongoose.connect(process.env.DB).then(() => {
  console.log("DB Connected!");
  app.listen(process.env.PORT, () => {
    console.log(`server running on 3000`);
  });
});
