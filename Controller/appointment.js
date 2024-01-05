exports.appointment = (req, res) => {
    res.render("appointment",{errors:req.session.validationErrors});
  };
  