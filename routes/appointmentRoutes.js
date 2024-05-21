const { addAppointmentController } = require("../controller/appointmentController");

const express = require("express");
const authMiddleware = require("../middleware/AuthMiddleware");



// ADD NEW APPOINTMENT
router.post("/addNewAppointment", authMiddleware, addAppointmentController);