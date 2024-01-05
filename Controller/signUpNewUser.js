const UserData = require("../modules/UserData");
exports.signUpNewUser = async (req, res) => {
  console.log(req.body);
  if (req.body.confirm_password == req.body.password) {
    await UserData.create(req.body, (err, user) => {
      if (err) {
        const validationerr = Object.keys(err.errors).map(
          (key) => err.errors[key].message
        );

        req.flash("validationErrors", validationerr);
        return res.redirect("/login");
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/login");
  }
};
