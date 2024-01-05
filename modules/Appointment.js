const mongoose = require("mongoose");
 const schema = mongoose.Schema;
// install npm i --save bcrypt
var uniqueValidator = require('mongoose-unique-validator');

const AppointmentSchema = new schema({
 
  date: { type: String, required: true, default: "1987-10-02", unique: [true,"username is already used"]  },
   time : { type: Array, required: true,validate: v => Array.isArray(v) && v.length > 0 },
   isTimeSlotAvailable: { type: Boolean, default: "true"}
 
});
 
AppointmentSchema.plugin(uniqueValidator);
 


const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;
