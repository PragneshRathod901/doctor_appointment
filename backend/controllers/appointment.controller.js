const AppointmentService = require("../services/appointment.service.js");

const AppointmentServiceInstance = new AppointmentService();

const getAllAppointments = async (req, res) => {
  try {
    const result = await AppointmentServiceInstance.getAllAppointments();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to find appointments" });
  }
};

module.exports = { getAllAppointments };
