const {
  loginController,
  registerController,
  empAuthController,
  deleteEmpController,
  getAllEmployeeController,
  addEmployeeController,
  updateEmployeeController,
} = require("../controller/empController");

const express = require('express');
const authMiddleware = require('../middleware/AuthMiddleware');

// router object
const router = express.Router();

//routes
// LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//AUTH || POST
router.post('/getEmpData', authMiddleware, empAuthController)

//GET ALL EMPLOYEE || GET
router.get("/getAllEmployee", authMiddleware, getAllEmployeeController);

//ADD NEW EMPLOYEE || POST
router.post("/addNewEmp", authMiddleware, addEmployeeController);

//UPDATE EMPLOYEE || POST
router.post("/updateEmp", authMiddleware, updateEmployeeController);

//DELETE || DEL
router.delete('/deleteEmp/:id', authMiddleware, deleteEmpController)

module.exports = router;
