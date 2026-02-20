import { DataGrid } from "@mui/x-data-grid";
import { Paper, Chip } from "@mui/material";

export default function AttendanceTable({ records }) {

  const columns = [
    { field: "empId", headerName: "Employee ID", flex: 1 },

    { field: "date", headerName: "Date", flex: 1 },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const value = params.value?.toLowerCase();

        const capitalized =
          value?.charAt(0).toUpperCase() + value?.slice(1);

        return (
          <Chip
            label={capitalized}
            color={value === "present" ? "success" : "error"}
            variant="filled"
          />
        );
      },
    },
  ];

  const rows = records.map((r, index) => ({
    id: r._id || index,
    ...r,
  }));

  return (
    <Paper sx={{ mt: 4, height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Paper>
  );
}
