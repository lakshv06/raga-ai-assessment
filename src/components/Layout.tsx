import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Dashboard as DashIcon,
  People as PeopleIcon,
  Analytics as AnalyticsIcon,
  Logout as LogoutIcon,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAppContext } from "../context/AppContext";
import Toast from "./Toast";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { toggleTheme, isDarkMode } = useAppContext();

  const menuItems = [
    { text: "Dashboard", icon: <DashIcon />, path: "/dashboard" },
    { text: "Patients", icon: <PeopleIcon />, path: "/patients" },
    { text: "Analytics", icon: <AnalyticsIcon />, path: "/analytics" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
        elevation={1}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", color: "primary.main" }}
          >
            HealthSaaS B2B
          </Typography>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton onClick={() => signOut(auth)} color="inherit">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", mt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        location.pathname === item.path
                          ? "primary.main"
                          : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar />
        {children}
      </Box>
      <Toast />
    </Box>
  );
};

export default Layout;
