const express = require("express");
const router = express.Router();
const {
  markAttendance,
  getAttendance,
  getPresentDays,
} = require("../controllers/attendanceController");

// Mark Attendance
router.post("/mark", markAttendance);

// Get Attendance by Employee ID
router.get("/:id", getAttendance);

router.get("/summary/:id", getPresentDays);

module.exports = router;
