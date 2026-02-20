import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Paper, Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate } from "react-router-dom";

export default function EmployeeTable({ employees, onDelete, onRowClick }) {
  const navigate = useNavigate();

  const columns = [
    { field: "employeeId", headerName: "Employee ID", flex: 1 },
    { field: "fullName", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          {/* Mark Attendance Button */}
          <Button
            size="small"
            color="primary"
            startIcon={<HowToRegIcon />}
            onClick={(e) => {
              e.stopPropagation(); // prevent row click
              navigate(`/mark/${params.row.employeeId}`);
            }}
          >
            Mark Attendance
          </Button>
&nbsp; &nbsp;
&nbsp; &nbsp;         
{/* Delete Button */}
          <IconButton
            color="error"
            onClick={(e) => {
              e.stopPropagation(); // prevent row click
              onDelete(params.row._id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const rows = employees?.map((emp, index) => ({
    id: emp._id || index,
    ...emp,
  }));

  return (
    <Paper sx={{ height: 500, mt: 4 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        onRowClick={(params) => {
          onRowClick(params.row._id);

          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }}
      />
    </Paper>
  );
}
