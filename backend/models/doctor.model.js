const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  
  name: { type: String, default: "" },
    workingHours: {
        startHH:{ type: Number, default: 8 },
        startMM:{ type: Number, default: 8 },
        endHH:{ type: Number, default: 8 },
        endMM:{ type: Number, default: 8 },
    },
});

const doctorModel = mongoose.model("Doctors", doctorSchema);
module.exports = doctorModel;
