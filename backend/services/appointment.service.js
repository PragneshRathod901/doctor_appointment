const appointmentModel = require("../models/appointment.model");

class AppointmentService {
  /**
   * get list of all appointments
   * @returns {Array} list of all appointments
   */
  getAllAppointments = async () => {
    try {
      const data = await appointmentModel.find({});
      return data;
    } catch (err) {
      throw err;
    }
  };
}
module.exports = AppointmentService;
