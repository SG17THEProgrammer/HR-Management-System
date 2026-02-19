import { Typography, Paper } from "@mui/material";

export default function Dashboard() {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4">Welcome to HR Dashboard</Typography>
      <Typography sx={{ mt: 2 }}>
        Manage employee attendance efficiently.
      </Typography>
    </Paper>
  );
}
