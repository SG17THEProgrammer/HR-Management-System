import { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import API from "../api/axios";
import AttendanceTable from "../components/AttendanceTable";

export default function FilterAttendance() {
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);

  const handleFilter = async () => {
    const res = await API.get("/attendance/filter", {
      params: { date },
    });
    setRecords(res.data.records);
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5">Filter Attendance</Typography>

      <TextField
        type="date"
        margin="normal"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setDate(e.target.value)}
      />

      <Button variant="contained" sx={{ ml: 2 }} onClick={handleFilter}>
        Filter
      </Button>

      <AttendanceTable records={records} />
    </Paper>
  );
}
