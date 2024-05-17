const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: [true, "password is required"],
    validate: {
      validator: function (value) {
        // Example: Password should be at least 8 characters long
        return value.length >= 8;
      },
      message: "Password must be at least 8 characters long",
    },
  },
  employeeType: {
    type: String,
    enum: ["admin", "data_operator"],
    default: "data_operator",
    validate: {
      validator: function (value) {
        return value === "admin" || value === "data_operator";
      },
      message: 'Employee type must be "admin" or "data_operator"',
    },
  },
});

const empModel = mongoose.model("employee", empSchema);

module.exports = empModel;
