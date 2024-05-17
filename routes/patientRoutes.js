const {
  deletePatientController,
  addPatientController,
  updatePatientController,
  getAllPatientsController,
} = require("../controller/patientController");

const express = require("express");
const authMiddleware = require("../middleware/AuthMiddleware");

// router object
const router = express.Router();

//routes
// GET ALL PATIENTS
router.get("/getAllPatients", authMiddleware, getAllPatientsController);

// ADD NEW PATIENT
router.post("/addNewPatient", authMiddleware, addPatientController);

// UPDATE PATIENT
router.put("/updatePatient", authMiddleware, updatePatientController);

// DELETE PATIENT
router.delete("/deletePatient/:id", authMiddleware, deletePatientController);

module.exports = router;

