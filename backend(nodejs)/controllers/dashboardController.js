const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");

exports.getSummary = async (req, res) => {
  const totalEmployees = await Employee.countDocuments();
  const totalPresent = await Attendance.countDocuments({ status: "present" });

  res.json({ totalEmployees, totalPresent });
};


