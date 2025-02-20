const router = require("express").Router();

const { getAllDoctors } = require("../controllers/doctor.controller");

router.get("/", getAllDoctors);

module.exports = router;
