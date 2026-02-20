import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import toast from "react-hot-toast";
import { addEmployee } from "../employeeApi";

export default function AddEmployee() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    employeeId: "",
    department: "",
  });


  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await addEmployee({...form , employeeId:`EMP00${form.employeeId}`});
      toast.success("Employee added successfully");
      setForm({ fullName: "", email: "", employeeId: "", department: "" });
    } catch (err) {
      // console.log(err.response);
      if (err.response?.data?.detail) {
        const errors = err.response.data.detail;

        // If it's array (FastAPI validation error)
        if (Array.isArray(errors)) {
          const firstError = errors[0];
          toast.error(firstError.msg);
        } else {
          toast.error(errors);
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card elevation={6} sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Add Employee
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Employee ID"
              required
              value={form.employeeId}
              onChange={(e) =>
                setForm({ ...form, employeeId: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    EMP00
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              value={form.fullName}
              type="text"
              onChange={(e) =>
                setForm({ ...form, fullName: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Department"
              value={form.department}
              type="text"
              onChange={(e) =>
                setForm({ ...form, department: e.target.value })
              }
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Add Employee"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
