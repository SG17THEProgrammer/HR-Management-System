import { Typography, Paper, Chip } from "@mui/material";
import { getDashboardStats } from "../attendanceApi";
import { useEffect, useState } from "react";

export default function Dashboard() {

    const [data , setData] = useState([]);

    const dashboardData = async () => {
        const res = await getDashboardStats();
        // console.log(res);
        setData(res.data);
      };

      useEffect(() => {
        dashboardData();
      }
        , []);

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4">Welcome to HR Dashboard</Typography>
      <Typography sx={{ mt: 2 }}>
        Manage employee attendance efficiently.
      </Typography>
<br />
      <Chip label={`Total Employees: ${data.totalEmployees || 0}`} />
        <Chip label={`Total Present Records: ${data.totalPresentRecords || 0}`} sx={{ ml: 2 }} />
        <Chip label={`Total Absent Records: ${data.totalAbsentRecords || 0}`} sx={{ ml: 2 }} />

    </Paper>
  );
}
