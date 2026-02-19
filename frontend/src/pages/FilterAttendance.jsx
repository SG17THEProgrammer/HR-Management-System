import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import API from "../api";
import AttendanceTable from "../components/AttendanceTable";
import toast from "react-hot-toast";

export default function FilterAttendance() {
  const [filters, setFilters] = useState({
    employeeId: "",
    date: "",
    start_date: "",
    end_date: "",
  });

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilter = async () => {
    try {
      setLoading(true);

      let empIdHex;
      if (filters.employeeId) {
        try {
          const hexRes = await API.get(
            `/employees/getEmpIdHex/${filters.employeeId.trim()}`
          );
          empIdHex = hexRes.data.employeeIdHex;
        } catch (err) {
          toast.error("Invalid Employee Code (must be EMPXXX)");
          setLoading(false);
          return;
        }
      }

      const res = await API.get("/attendance/filter", {
        params: {
          employeeId: empIdHex || undefined,
          date: filters.date || undefined,
          start_date: filters.start_date || undefined,
          end_date: filters.end_date || undefined,
        },
      });

      setRecords(res.data.records);
      toast.success("Filtered successfully");
    } catch (err) {
      toast.error("Failed to filter records");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFilters({
      employeeId: "",
      date: "",
      start_date: "",
      end_date: "",
    });
    setRecords([]);
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Filter Attendance
      </Typography>

      <Grid container spacing={2} mt={1}>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Employee Code"
            value={filters.employeeId}
            helperText="Enter EMP001 style code (optional)"
            onChange={(e) =>
              setFilters({ ...filters, employeeId: e.target.value })
            }
          />
        </Grid>

        {/* Single Date */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Specific Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.date}
            onChange={(e) =>
              setFilters({ ...filters, date: e.target.value })
            }
          />
        </Grid>

        {/* Start Date */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.start_date}
            onChange={(e) =>
              setFilters({ ...filters, start_date: e.target.value })
            }
          />
        </Grid>

        {/* End Date */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.end_date}
            onChange={(e) =>
              setFilters({ ...filters, end_date: e.target.value })
            }
          />
        </Grid>
      </Grid>

      {/* Buttons */}
      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleFilter}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Apply Filters"
          )}
        </Button>

        <Button variant="outlined" color="secondary" onClick={handleClear}>
          Clear
        </Button>
      </Box>

      <AttendanceTable records={records} />
    </Paper>
  );
}
