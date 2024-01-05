const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const UserData = require("./modules/UserData");
global.loggedIn = null;
global.userType = null;

// const SignUpUser = require("./modules/signUp_user");
const { dashboard } = require("./Controller/dashboard");
const { g_page } = require("./Controller/g_page");
const { g2_page } = require("./Controller/g2_page");
const { login_page } = require("./Controller/login_page");
const { dashboard_page } = require("./Controller/dashboard_page");
const {
  update_data_g2page,
  createNewUser,
  retrieveUserData,
} = require("./Controller/User_data_Crud_Opration");
const { signUpNewUser } = require("./Controller/signUpNewUser");
const { loginUser } = require("./Controller/loginUser");
const expressSession = require("express-session");
const authMiddleware = require("./middlerwares/authMiddleware");
const { logoutUser } = require("./Controller/logoutUser");
const { appointment } = require("./Controller/appointment");
const Appointment = require("./modules/Appointment");
const { Datechange } = require("./Controller/dateChange");
const flash = require("connect-flash");
const { appointment_booking } = require("./Controller/appointment_booking");
app.use(express.json());
app.use(express.urlencoded());
app.use(
  expressSession({
    secret: "keyboard cat",
  })
);
// to connect with mongoose connection
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.f8rjolj.mongodb.net/DriveTest?retryWrites=true&w=majority"
);

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(flash());

// website will listen on 4040 port number
app.listen(4040, () => {
  console.log("hello, project is working");
});

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  userType = req.session.userType;
  next();
});

//  routes with render files respectively
app.get("/", dashboard);
app.get("/g_page", authMiddleware, g_page);
app.get("/g2_page", authMiddleware, g2_page);
app.get("/login", (req, res) => {
  res.render("login_page", { errors: req.flash("validationErrors") });

  // errors: req.session.validationErrors,
});
app.get("/dashboard", dashboard_page);
app.post("/g2_page/store", createNewUser);
app.post(
  "/g2_page/receive_data/update_data",
  authMiddleware,
  update_data_g2page
);
app.post("/g_page/receive_data", authMiddleware, retrieveUserData);
app.post("/newuser/store", signUpNewUser);

app.post("/login/loginuser/getdata", loginUser);
app.get("/auth/logout", logoutUser);
app.get("/user/appointment", authMiddleware, appointment);
app.post("/appointment/booking/store", authMiddleware, appointment_booking);

app.post("/userdate", Datechange);
