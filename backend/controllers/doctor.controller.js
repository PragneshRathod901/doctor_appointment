const DoctorService = require("../services/doctor.service.js");

const DoctorServiceInstance = new DoctorService();

const getAllDoctors = async (req, res) => {
  try {
    const result = await DoctorServiceInstance.getAllDoctors();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to find doctors" });
  }
};

const getAvailableSlots = async (req, res) => {
  const doctorId = req.params.id;
  const dateStr = req.query.date;

  try {
    const result = await DoctorServiceInstance.getSlotAvailable(
      doctorId,
      new Date(dateStr)
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to find slots " + err });
  }
};

module.exports = { getAllDoctors, getAvailableSlots };
