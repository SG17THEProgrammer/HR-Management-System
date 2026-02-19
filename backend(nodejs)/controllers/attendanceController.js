const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

exports.markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const attendance = await Attendance.create({
      employee: employeeId,
      date,
      status,
    });


    res.status(201).json({attendance, message: "Attendance marked successfully"});


  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Attendance already marked for this date" });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const { date } = req.query;

    let filter = { employee: req.params.id };

    // If date filter provided
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      filter.date = { $gte: start, $lte: end };
    }

    const records = await Attendance.find(filter).sort({ date: -1 });

    res.status(200).json({records, message: "Attendance records retrieved successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid request" });
  }
};



exports.getPresentDays = async (req, res) => {
  try {
    const totalPresent = await Attendance.countDocuments({
      employee: req.params.id,
      status: "present",
    });

    res.status(200).json({
      employeeId: req.params.id,
      totalPresentDays: totalPresent,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid employee ID" });
  }
};
