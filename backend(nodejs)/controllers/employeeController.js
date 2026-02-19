const Employee = require("../models/Employee");

exports.createEmployee = async (req, res) => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    if (!employeeId || !fullName || !email || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const employee = await Employee.create(req.body);
    res.status(201).json({employee, message: "Employee created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate employee or email" });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  const employees = await Employee.find().sort({ createdAt: -1 });
  res.json({employees , message: "Employees retrieved successfully" });
};

exports.deleteEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

const remainingEmployees = await Employee.find().sort({ createdAt: -1 });

  res.json({ remainingEmployees, message: "Employee deleted successfully" });
};
