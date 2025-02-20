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

module.exports = { getAllDoctors };
