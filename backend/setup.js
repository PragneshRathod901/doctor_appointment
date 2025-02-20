const DoctorModel = require("./models/doctor.model");
require("dotenv").config();

const mongoose = require("mongoose");

console.log("starting inserting Data");
// MongoDB connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const data = [
  {
    name: "Dr.Pragnesh Rathod",
    workingHours: { startHH: "10", startMM: "0", endHH: "18", endMM: "0" },
  },
  {
    name: "Dr. Sanjay Tyagi",
    workingHours: { startHH: "10", startMM: "0", endHH: "18", endMM: "0" },
  },
];

DoctorModel.deleteMany({})
  .then(() => {
    console.log("cleaned DB");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

DoctorModel.insertMany(data)
  .then(() => {
    console.log("inserted");
    process.exit(1);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
