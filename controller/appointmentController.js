const appointmentModel = require("../models/appointmentModel.js");
const patientModel = require("../models/appointmentModel.js");

const addAppointmentController = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, reason } = req.body;

    // Check and validate if required fields are provided
    if (!patientId || !doctorId || !date || !time || !reason) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newAppointment = new appointmentModel({
      patient: patientId, // Use patient ID instead of creating a new patient
      doctor: doctorId,
      date,
      time,
      reason,
    });

    // Save the new appointment to the database
    await newAppointment.save();

    // Send success response
    res.status(201).send({ message: "Appointment added successfully", success: true });
  } catch (error) {
    console.log("Error adding Appointment:", error);
    res.status(500).send({ message: "Error adding Appointment", success: false, error });
  }
};


module.exports = {
  addAppointmentController,
};