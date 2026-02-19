import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import toast from "react-hot-toast";
import { getEmployeeSummary } from "../employeeApi";

export default function EmployeePresentSummary({ employeeId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await getEmployeeSummary(employeeId);
        // console.log(res);
        setData(res.data);
      } catch (err) {
        toast.error(
          err.response?.data?.detail || "Failed to fetch summary"
        );
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) fetchSummary();
  }, [employeeId]);

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <CircularProgress />
      </Box>
    );

  if (!data) return null;

  return (
    <Card
      elevation={6}
      sx={{
        mt: 3,
        background: "linear-gradient(135deg, #1976d2, #42a5f5)",
        color: "white",
      }}
    >
      <CardContent>
        <Typography variant="h6">
          Employee ID
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {data.employeeId}
        </Typography>
<Box sx={{display:"flex"}}>
<Box>

        <Typography variant="h4" fontWeight="bold">
          {data.totalPresentDays}
        </Typography>
        <Typography variant="body2">
          Total Present Days
        </Typography>
</Box>
&nbsp; &nbsp; &nbsp; &nbsp;
<Box>


        <Typography variant="h4" fontWeight="bold">
          {data.totalAbsentDays}
        </Typography>
        <Typography variant="body2">
          Total Absent Days
        </Typography>
</Box>
</Box>

      </CardContent>
    </Card>
  );
}
