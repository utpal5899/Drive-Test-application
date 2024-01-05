const session = require("express-session");
const UserData = require("../modules/UserData");
const { g2_page } = require("./g2_page");

exports.g_page = (req, res) => {
  // here we send umdefine data to g paga, because we will send data once we receive from database

  let id = req.session.userId;
 
  UserData.findById(id, async (err, datas) => {
    let data = await datas;
console.log("dsfjklnlsdjkfnsdlfknhjsoeifhjsdflsnlnksdflik")
    console.log(data);

    if (data.l_Name == "default") {
      data = {
        f_Name: "",
        l_Name: "",
        license_no: "",
        date_of_birth: "",
        description: "",
        model_type: "",
        age: "",
        year: "",
        plat_number: "",
      };
      res.render("g_page", { data:null, val:true });
    } else {
      res.render("g_page", { data: data, val:false });
    }
  });
};
