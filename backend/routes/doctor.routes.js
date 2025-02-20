const router = require("express").Router();

const {
  getAllDoctors,
  getAvailableSlots,
} = require("../controllers/doctor.controller");

router.get("/", getAllDoctors);
router.get("/:id/slots", getAvailableSlots);

module.exports = router;
