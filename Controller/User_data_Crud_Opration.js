const session = require("express-session");
const path = require("path");
const UserData = require("../modules/UserData");

exports.update_data_g2page = async (req, res) => {
  console.log(req.body);
  const update = {
    f_Name: req.body.f_Name,
    l_Name: req.body.l_Name,
    license_no: req.body.license_no,
    age: req.body.age,
    date_of_birth: req.body.date_of_birth,
    description: req.body.description,
    model_type: req.body.model_type,
    year: req.body.year,
    plat_number: req.body.plat_number,
    appointment_time:req.body.available_time,
    appointment_date:req.body.available_date,
 
  };

  await UserData.findByIdAndUpdate({ _id: req.session.userId }, update);

  // using findOneAndUpdate function we can update values on database
  res.render("g_page", { data: update, val:false });
};

exports.createNewUser = async (req, res) => {

 let random="@#$%^&*()!][{}0123456789abcdefghijklmnopqrstuvwxyz"
 let appointment_id=""
 for(let i=0;i<=20;i++)
 {
appointment_id=appointment_id+ random[Math.floor(Math.random() * 50)]
 }
 

  console.log(req.body)
  const update = {
    f_Name: req.body.f_Name,
    l_Name: req.body.l_Name,
    license_no: req.body.license_no,
    age: req.body.age,
    date_of_birth: req.body.date_of_birth,
    description: req.body.description,
    model_type: req.body.model_type,
    year: req.body.year,
    plat_number: req.body.plat_number,
    appointment_time: req.body.available_slots,
    appointment_date: req.body.available_date,
    appointment_id:appointment_id
  };
  console.log(update);
  await UserData.findByIdAndUpdate({ _id: req.session.userId }, update);
  res.render("dashboard");
};

exports.retrieveUserData = async (req, res) => {
  //   to find users data from database using license number
  let license_ = req.body.license_no;

  UserData.find({ license_no: license_ }, async (error, UserData) => {
    console.log(error, UserData);

    //  it will store userdata to data variable
    let data = await UserData;

    if (data.length > 0) {
      // if data contain any value then this block will run
      res.render("g_page", { data, val:false });
    } else {
      // this block will render error page
      res.render("error");
    }
  });
};
