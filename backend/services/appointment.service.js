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

  /**
   * get appointments by doctor id on specific date
   * @param {String} doctorId
   * @param {Date} date
   * @returns {Array}
   */
  static getAppointmentByDoctor = async (doctorId, date) => {
    try {
      const data = await appointmentModel.find({
        doctorId: doctorId,
        date: {
          $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          $lt: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1
          ),
        },
      });
      return data;
    } catch (err) {
      throw err;
    }
  };

  /**
   * get appointment from id
   * @param {String} id
   */
  getAppointmentById = async (id) => {
    try {
      return await appointmentModel.findById(id);
    } catch (err) {
      throw err;
    }
  };

  /**
   * Create a new appointment after checking time slot availability
   * @param {Object} appointmentData
   */
  createAppointment = async (appointmentData) => {
    try {
      const { doctorId, duration } = appointmentData;
      const date = new Date(appointmentData.date);
      const endTime = new Date(date.getTime() + duration * 60000);

      const overlappingAppointments = await appointmentModel.find({
        doctorId: doctorId,
        date: { $lt: endTime },
        $expr: { $gt: ["$date", new Date(date.getTime() - duration * 60000)] },
      });

      if (overlappingAppointments.length > 0) {
        throw new Error("The requested time slot is not available");
      }

      const newAppointment = new appointmentModel(appointmentData);
      return await newAppointment.save();
    } catch (err) {
      throw err;
    }
  };

  /**
   * check Availability and Update appointment
   * @param {String} id
   * @param {Object} updatedData
   */
  updateAppointment = async (id, updatedData) => {
    try {
      const existingAppointment = await appointmentModel.findById(id);
      if (!existingAppointment) throw new Error("Appointment not found");

      const { doctorId, duration } = updatedData;
      const date = new Date(updatedData.date);
      const endTime = new Date(date.getTime() + duration * 60000);

      const overlappingAppointments = await appointmentModel.find({
        doctorId: doctorId,
        _id: { $ne: id },
        date: { $lt: endTime },
        $expr: { $gt: ["$date", new Date(date.getTime() - duration * 60000)] },
      });

      if (overlappingAppointments.length > 0) {
        throw new Error("The requested time slot is not available");
      }
      return await appointmentModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
    } catch (err) {
      throw err;
    }
  };

  /**
   * delete appointment
   * @param {String} id
   */
  deleteAppointment = async (id) => {
    try {
      const result = await appointmentModel.findByIdAndDelete(id);
      if (!result) throw new Error("Appointment not found");
      return result;
    } catch (err) {
      throw err;
    }
  };
}
module.exports = AppointmentService;
