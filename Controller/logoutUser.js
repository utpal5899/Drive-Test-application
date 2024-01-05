exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
