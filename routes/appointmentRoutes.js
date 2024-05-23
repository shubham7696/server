const {
  addAppointmentController,
  getAllAppointmentForToday,
} = require("../controller/appointmentController");

const express = require("express");
const authMiddleware = require("../middleware/AuthMiddleware");

// router object
const router = express.Router();


// ADD NEW APPOINTMENT
router.post("/addNewAppointment", authMiddleware, addAppointmentController);

// GET ALL APPOINTMENT
router.get("/getAllAppointment", authMiddleware, getAllAppointmentForToday);

// UPDATE APPOINTMENT
router.get("/appointments/:id", authMiddleware, updateAppointment);

module.exports = router;