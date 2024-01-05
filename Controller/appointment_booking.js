const Appointment = require("../modules/Appointment");

exports.appointment_booking = async (req, res) => {
  console.log(req.body);
  await Appointment.create(req.body, (err, user) => {
    if (err) {
      const validationerr = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );

      req.flash("validationErrors", validationerr);

      res.render("appointment", { errors: req.flash("validationErrors") });
    } else {
      res.redirect("/");
    }
  });
};
