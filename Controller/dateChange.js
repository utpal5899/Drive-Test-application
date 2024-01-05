const { error } = require("console");
const userDatechange = require("../modules/Appointment");

exports.Datechange = async (req, res) => {
  try {
    console.log(req.body);
    userDatechange.find({ date: req.body.date }, function (err, user) {
      res.send(user[0]);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true });
  }
};
