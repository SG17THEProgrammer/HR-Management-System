import { useState } from "react";
import { TextField, Button, Paper, MenuItem, Typography } from "@mui/material";
import API from "../api/axios";

export default function MarkAttendance() {
  const [form, setForm] = useState({
    employeeId: "",
    date: "",
    status: "present",
  });

  const handleSubmit = async () => {
    try {
      await API.post("/attendance/mark", form);
      alert("Attendance marked successfully");
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5">Mark Attendance</Typography>

      <TextField
        fullWidth
        label="Employee ID"
        margin="normal"
        onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
      />

      <TextField
        fullWidth
        type="date"
        margin="normal"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <TextField
        select
        fullWidth
        margin="normal"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <MenuItem value="present">Present</MenuItem>
        <MenuItem value="absent">Absent</MenuItem>
      </TextField>

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        Submit
      </Button>
    </Paper>
  );
}
