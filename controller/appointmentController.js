const appointmentModel = require("../models/appointmentModel.js");
const patientModel = require("../models/appointmentModel.js");

const addAppointmentController = async (req, res) => {
  try {
    console.log(req.body);
    const { patientId, doctorId, date, time, patientNumber, patientEmail, description } = req.body;

    // Check and validate if required fields are provided
    if (!patientId || !doctorId || !date || !time || !description) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newAppointment = new appointmentModel({
      patient: patientId,
      patientNumber,
      patientEmail,
      doctor: doctorId,
      date,
      time,
      reason: description,
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

const getAllAppointmentForToday = async (req, res) => {
  try {
    const { phone, email, date } = req.query;
    let query = {};

    if (phone) {
      // same will be received in email as well 
      query = {
        $or: [
          { patientEmail: new RegExp(email, "i") },
          { patientNumber: new RegExp(phone, "i") },
        ],
      };
    }
    if (date) {
      query["date"] = date;
    } 

    console.log("========= here query",query)
    if(!phone && !email && !date) {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");

      const startDateString = `${year}-${month}-${day}`;
      const endDateString = `${year}-${month}-${day}`;
      query = {
        date: { $gte: startDateString, $lte: endDateString },
      };
    }

    const appointments = await appointmentModel.find(query).populate("patient").sort({ date: 1 });

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.log("Error fetching appointments:", error);
    res.status(500).send({ success: false, message: "Error fetching appointments", error });
  }
};

module.exports = {
  addAppointmentController,
  getAllAppointmentForToday,
};
