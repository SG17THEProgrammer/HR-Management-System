import { Box, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 220;

export default function Layout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6">HR Attendance System</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, mt: 8 },
        }}
      >
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/mark">
            <ListItemText primary="Mark Attendance" />
          </ListItem>
          <ListItem button component={Link} to="/filter">
            <ListItemText primary="Filter Attendance" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}
