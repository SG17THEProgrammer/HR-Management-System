const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  deleteEmployee,
} = require("../controllers/employeeController");

// Create Employee
router.post("/create", createEmployee);

// Get All Employees
router.get("/", getEmployees);

// Delete Employee
router.delete("/delete/:id", deleteEmployee);

module.exports = router;
