const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: String },
  date: { type: Date },
  duration: { type: Number, default: 0 },
  appointmentType: { type: String, default: "" },
  patientName: { type: String, default: "" },
  notes: { type: String, default: "" },
});

const appointmentModel = mongoose.model("Appointments", appointmentSchema);
module.exports = appointmentModel;
