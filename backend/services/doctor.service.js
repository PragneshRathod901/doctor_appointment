const doctorModel = require("../models/doctor.model");
const AppointmentService = require("./appointment.service");

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

  getSlotAvailable = async (id, date) => {
    try {
      const appointments = await AppointmentService.getAppointmentByDoctor(
        id,
        date
      );

      const doctor = await doctorModel.findOne({ _id: id });
      const startMinutes =
        doctor.workingHours.startHH * 60 + doctor.workingHours.startMM;
      const endMinutes =
        doctor.workingHours.endHH * 60 + doctor.workingHours.endMM;

      const slots = (endMinutes - startMinutes) / 30;
      const availableSlots = [];
      const doc_start = startMinutes;

      for (let i = 0; i < slots; i++) {
        const slot_start = doc_start + i * 30;
        const slot_end = slot_start + 30;
        let overlaps = false;
        for (let j = 0; j < appointments.length; j++) {
          const app_start =
            appointments[j].date.getHours() * 60 +
            appointments[j].date.getMinutes();
          const app_end = app_start + appointments[j].duration;

          if (app_start <= slot_start && slot_end <= app_end) {
            overlaps = true;

            break;
          }
        }
        if (!overlaps) {
          availableSlots.push({
            startHH: Math.floor(slot_start / 60),
            startMM: slot_start - Math.floor(slot_start / 60) * 60,
            endHH: Math.floor(slot_end / 60),
            endMM: slot_end - Math.floor(slot_end / 60) * 60,
          });
        }
      }
      return availableSlots;
    } catch (err) {
      throw err;
    }
  };
}
module.exports = DoctorService;
