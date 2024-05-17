const patientModel = require("../models/patientModel.js");

const deletePatientController = async (req, res) => {
  console.log(req.params.id); // Log patient ID
  console.log(req.body);

  try {
    // Find the patient by ID and delete it
    const deletedPatient = await patientModel.findByIdAndDelete(req.params.id);

    if (!deletedPatient) {
      return res.status(404).send({ message: "Patient not found", success: false });
    }
    res
      .status(200)
      .send({ message: "Patient deleted successfully", success: true, data: deletedPatient });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Unable to delete patient", success: false, error });
  }
};

const addPatientController = async (req, res) => {
  try {
    // Check if the email is already registered
    const existingPatient = await patientModel.findOne({ email: req.body.email });
    if (existingPatient) {
      return res
        .status(400)
        .send({ message: "Patient with this email already exists", success: false });
    }

    const newPatient = new patientModel(req.body);

    // Validate the new patient data before saving
    const validationErrors = newPatient.validateSync();

    if (validationErrors) {
      const firstErrorMessage =
        validationErrors.errors[Object.keys(validationErrors.errors)[0]].message;
        console.log(firstErrorMessage)
      return res
        .status(400)
        .send({ message: firstErrorMessage.message, error: firstErrorMessage, success: false });
    }

    // Save the new patient to the database
    await newPatient.save();

    // Send success response
    res.status(201).send({ message: "Patient added successfully", success: true });
  } catch (error) {
    console.log("Error adding patient:", error);
    res.status(500).send({ message: "Error adding patient", success: false, error });
  }
};

const updatePatientController = async (req, res) => {
  try {
    console.log(req.body)
    const {_id: patientId, ...updateData} = req.body
    if(!patientId){
        console.log("################", error, "################# 1 ");
        return res.status(400).send({message:"Patient ID required", success: false})
    }
   
    const updatedPatient = await patientModel.findByIdAndUpdate(patientId, req.body, {
      new: true,
      runValidators: true, // This will run the model validators
    });

    if (!updatedPatient) {
        console.log("################", error, "#################  2");
      return res.status(404).send({ message: "Patient not found" });
    }
    res
      .status(200)
      .send({ message: "Patient updated successfully", success: true, updatedPatient });
  } catch (error) {
    res.status(500).send({ message: "Unable to update patient", success: false, error });
  }
};

const getAllPatientsController = async (req, res) => {
  try {
    // Fetch all patients from the database
    const patients = await patientModel.find();
    // Send the list of patients as a response
    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    console.log("Error fetching patients:", error);
    res.status(500).send({ success: false, message: "Error fetching patients", error });
  }
};

module.exports = {
  deletePatientController,
  addPatientController,
  updatePatientController,
  getAllPatientsController,
};
