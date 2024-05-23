const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient", // Reference to the patient model
    required: [true, "Patient is required for an appointment"],
  },
  patientNumber: {
    type: String,
    validate: {
      validator: function (value) {
        // Basic phone number validation (adjust as needed)
        return /^\d+$/.test(value) && value.length >= 10; // Only digits and min length of 10
      },
      message: "Invalid phone number format. Must be digits only and at least 10 characters long.",
    },
  },
  patientEmail: {
    type: String,
    required: [true, "email is required"],
    validate: {
      validator: function (value) {
        // Basic email validation
        return /\S+@\S+\.\S+/.test(value);
      },
      message: "Invalid email format",
    },
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
