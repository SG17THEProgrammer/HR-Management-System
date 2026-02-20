import { useEffect, useState } from "react";
import { TextField, Button, Paper, MenuItem, Typography, ToggleButtonGroup, ToggleButton, CircularProgress } from "@mui/material";
import API from "../api";
import { Card, CardContent, Grid } from "@mui/material";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";


export default function MarkAttendance() {
    const { employeeId } = useParams();
    const [empId, setEmpId] = useState("");

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        employeeId: empId,
        date: "",
        status: "present",
    });


    useEffect(() => {
        if (employeeId) {
            setForm((prev) => ({
                ...prev,
                employeeId: employeeId,
            }));
        }
    }, [employeeId]);


    // console.log(form);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await API.post("/attendance/mark", form);
            toast.success("Attendance marked successfully");
            setForm({ employeeId: "", date: "", status: "present", empId: "" });

        } catch (err) {
            if (err.response?.data?.detail) {
                const errors = err.response.data.detail;
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
        <Card elevation={6} sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
            <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Mark Attendance
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Employee ID"
                            value={form.employeeId}
                            // disabled={!!employeeId}
                            onChange={(e) =>
                                setForm({ ...form, employeeId: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="date"
                            value={form.date}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) =>
                                setForm({ ...form, date: e.target.value })
                            }
                        />
                    </Grid>
                </Grid>

                {/* Toggle here */}
                <ToggleButtonGroup
                    value={form.status}
                    exclusive
                    onChange={(e, newStatus) =>
                        setForm({ ...form, status: newStatus })
                    }
                    sx={{ mt: 2 }}
                >
                    <ToggleButton value="present" color="success">
                        Present
                    </ToggleButton>
                    <ToggleButton value="absent" color="error">
                        Absent
                    </ToggleButton>
                </ToggleButtonGroup>
                <br />
                <Button
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                </Button>

            </CardContent>
        </Card>

    );
}
