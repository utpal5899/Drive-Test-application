const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;
// install npm i --save bcrypt
var uniqueValidator = require('mongoose-unique-validator');

const UserDataSchema = new schema({
  f_Name: { type: String, required: true, default: "default" },
  l_Name: { type: String, required: true, default: "default" },
  license_no: { type: String, required: true, default: "default" },
  age: { type: String, required: true, default: "default" },

  userName: { type: String, required: true,unique: [true,"username is already used"] },
  password: { type: String, required: true },
  user_type: { type: String, required: true },
  date_of_birth: { type: String, required: true, default: "1987-10-02" },
  description: { type: String, required: true, default: "default" },
  model_type: { type: String, required: true, default: "default" },
  year: { type: String, required: true, default: "default" },
  plat_number: { type: String, required: true, default: "default" },
  appointment_date: { type: String , default: "" },
  appointment_time: { type: String , default: "" },
  appointment_id: { type: String , default: "" }
});
UserDataSchema.plugin(uniqueValidator);
UserDataSchema.pre("save", function (next) {
  bcrypt.hash(this.license_no, 10, (err, hash) => {
    this.license_no = hash;
    console.log(hash);
    next();
  });
});

UserDataSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    console.log(hash);
    next();
  });
});

const UserData = mongoose.model("UserData", UserDataSchema);

module.exports = UserData;
