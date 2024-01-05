const bcrypt = require("bcrypt");
const UserData = require("../modules/UserData");
const express = require("express");
const app = express();
exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  UserData.findOne({ userName: username }, (err, user) => {
    console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          req.session.userType = user.user_type;
          req.session.userId = user._id;

          if (req.session.userType == "Driver") {
            res.redirect("/");
          } else if (req.session.userType == "Admin") {
            res.redirect("/");
          } else {
            const validationerr = ["password is wrong"];

            res.redirect("/login");
          }
        } else {
          const validationerr = ["password is wrong"];
          req.flash("validationErrors", validationerr);

          res.redirect("/login");
        }
      });
    } else {
      const validationerr = ["user does not exist"];

      req.flash("validationErrors", validationerr);

      res.redirect("/login");
    }
  });
};
