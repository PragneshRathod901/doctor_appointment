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

const getAppointmentById = async (req, res) => {
  try {
    const result = await AppointmentServiceInstance.getAppointmentById(
      req.params.id
    );
    if (!result)
      return res.status(404).json({ message: "Appointment not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve appointment" });
  }
};

const createAppointment = async (req, res) => {
  try {
    const result = await AppointmentServiceInstance.createAppointment(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const result = await AppointmentServiceInstance.updateAppointment(
      req.params.id,
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const result = await AppointmentServiceInstance.deleteAppointment(
      req.params.id
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
