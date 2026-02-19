import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    AppBar,
    Toolbar,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function Layout({ children }) {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
            <AppBar position="fixed" sx={{ zIndex: 1201 }}>
                <Toolbar>
                    <Typography variant="h6" fontWeight="bold">
                        HR Attendance System
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        mt: 8,
                        bgcolor: "#1e293b",
                        color: "#fff",
                    },
                }}
            >
                <List>
                    {[
                        { text: "Dashboard", path: "/" },
                        { text: "Add Employee", path: "/employees/add" },
                        { text: "Employees List", path: "/employees" },
                                        
                        { text: "Filter Attendance", path: "/filter" },

                    ].map((item) => (
                        <ListItemButton
                            key={item.text}
                            component={Link}
                            to={item.path}
                            sx={{ "&:hover": { bgcolor: "#334155" } }}
                        >
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 8 }}>
                {children}
            </Box>
        </Box>
    );
}
