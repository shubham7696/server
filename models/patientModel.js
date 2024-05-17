const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
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
  gender: {
    type: String,
    enum: ["male", "female", "other"], // Adjust as needed
    required: [true, "Gender is required"],
  },
  age: {
    type: Number,
    required: [true, "age is required"],
    min: [1, "Age must be at least 1"],
    max: [99, "Age cannot exceed 99"],
  },
  description: {
    type: String,
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], // Adjust as needed
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        // Basic phone number validation (adjust as needed)
        return /^\d+$/.test(value) && value.length >= 10; // Only digits and min length of 10
      },
      message: "Invalid phone number format. Must be digits only and at least 10 characters long.",
    },
  },
  department: {
    type: String,
  },
  doctor: {
    type: String,
  },
  appointmentsBooked: {
    type: Number,
    default: 0, // Set to 0 by default
  },
  customerType: {
    type: String,
    enum: ["regular", "prime", "vip"], // Possible customer types
    default: "regular", // Explicitly setting default to "regular"
  },
});

const patientModel = mongoose.model("patient", patientSchema);

module.exports = patientModel;
