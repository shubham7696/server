const userModel = require("../models/employeeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { encryptPassword, comparePasswords } = require("../utils/encryptDecrypt");

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({ message: "User Already exists", success: false });
    }
    const hashedPassword = await encryptPassword(req.body.password);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Register controller ${error.message}` });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: "User not found !", success: false });
    }
    const isMatch = await comparePasswords(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({ message: "Invalid Email or password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).send({ message: "Login Success", success: true, data: user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const empAuthController = async (req, res) => {
  //console.log(req)
  try {
    const user = await userModel.findOne({ _id: req.body.user.userId });
    if (!user) {
      return res.status(200).send({ message: "User not found !", success: false });
    } else {
      return res
        .status(200)
        .send({ message: "Invalid Email or password", success: true, data: user });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).send({ message: "Login Success", success: true, data: user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Authentication Error`, success: false, error });
  }
};

const deleteEmpController = async (req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  try {
    // Check if the user is authorized (e.g., admin role)
    //if (req.body.employeeType === "admin") {
      // Find the employee by ID and delete it
      const deletedEmployee = await userModel.findByIdAndDelete(req.params.id);

      if (!deletedEmployee) {
        return res.status(404).send({ message: "Employee not found", success: false });
      }

      res.status(200)
        .send({ message: "Employee deleted successfully", success: true, data: deletedEmployee });
    // } else {
    //   return res.status(403).send({ message: "Not allowed", success: false });
    // }

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Unable to delete employee", success: false, error });
  }
};

const updateEmployeeController = async (req, res) => {
  try {
    // Find the employee by ID and update their information
    const updatedEmployee = await userModel.findByIdAndUpdate(
      req.body.employeeId,
      {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
      },
      { new: true }
    );

    // Check if the employee exists
    if (!updatedEmployee) {
      return res.status(404).send({ message: "Employee not found" });
    }

    // Return success message and updated employee data
    res.status(200).send({ message: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Unable to update employee", success: false, error });
  }
};

const getAllEmployeeController = async (req, res) => {
  try {
    // Fetch all employees from the database
    const employees = await userModel.find({ employeeType: "data_operator" });
    // Send the list of employees as a response
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    console.log("Error fetching employees:", error);
    res.status(500).send({ success: false, message: "Error fetching employees", error });
  }
};

const addEmployeeController = async (req, res) => {
  try {
    delay(2000).then(() => {});
    // Check if the email is already registered
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists", success: false });
    }

    // Encrypt the password
    const hashedPassword = await encryptPassword(req.body.password);

    // Create a new user instance
    const newUser = new userModel({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
      employeeType: "data_operator", // Assuming you pass the employee type in the request body
    });

    // Save the new user to the database
    await newUser.save();

    // Send success response
    res.status(201).send({ message: "Employee added successfully", success: true });
  } catch (error) {
    console.log("Error adding employee:", error);
    res.status(500).send({ message: "Error adding employee", success: false, error });
  }
};

module.exports = {
  loginController,
  registerController,
  empAuthController,
  deleteEmpController,
  getAllEmployeeController,
  addEmployeeController,
  updateEmployeeController,
};
