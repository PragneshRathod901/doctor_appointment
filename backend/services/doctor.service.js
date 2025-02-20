const doctorModel = require("../models/doctor.model");

class DoctorService {
  /**
   * get list of all doctors
   * @returns {Array} list of all doctors
   */
  getAllDoctors = async () => {
    try {
      const data = await doctorModel.find({});
      return data;
    } catch (err) {
      throw err;
    }
  };
}
module.exports = DoctorService;
