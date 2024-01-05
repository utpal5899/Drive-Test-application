const session = require("express-session");
const UserData = require("../modules/UserData");

exports.g2_page = (req, res) => {
 
  let id = req.session.userId;

  UserData.findById(id, async (err, datas) => {
    let data = await datas;

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

      res.render("g2_page", { data});
    }else{
      
      res.render("g_page", { data, val:false});
    }

  });
};
