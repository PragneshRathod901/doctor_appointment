const router = require("express").Router();

const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointment.controller");

router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
