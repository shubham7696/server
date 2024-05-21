const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient", // Reference to the patient model
    required: [true, "Patient is required for an appointment"],
  },
  doctor: {
    type: String,
    required: [true, "Doctor is required for an appointment"],
  },
  date: {
    type: String,
    required: [true, "Appointment date is required"],
  },
  time: {
    type: String, 
    required: [true, "Appointment time is required"],
  },
  reason: {
    type: String,
    required: [true, "Reason for the appointment is required"],
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"], // Appointment statuses
    default: "pending",
  },
  notes: {
    type: String,
  },
});

const appointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = appointmentModel;
