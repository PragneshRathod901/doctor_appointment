require("dotenv").config();
const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const doctorRoute = require("./routes/doctor.routes");
const appointmentsRoute = require("./routes/appointment.routes");

const DB_URI = process.env.DB_URL;

const app = express();
const PORT = process.env.DB_Port;

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to DB at", DB_URI))
  .catch((error) => console.log("Failed to connect to DB\n", error));

app.use(cors());
app.use(express.json());
app.use("/api/doctors", doctorRoute);

app.use("/api/appointments", appointmentsRoute);

app.listen(PORT, () => {
  console.log("Server Listening at", PORT);
});
