import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Header = () => {
  const { user, logOut } = useAuth();
  console.log(user);
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Korean Shop
            </Typography>
            <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
              <Button color="inherit">Home</Button>
            </Link>

            <Link
              to="/appointment"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">Appointment</Button>
            </Link>
            {user?.email ? (
              <Box>
                <NavLink
                  style={{ textDecoration: "none", color: "white" }}
                  to="/dashboard"
                >
                  <Button color="inherit">Dashboard</Button>
                </NavLink>
                <Button onClick={logOut} color="inherit">
                  Logout
                </Button>
              </Box>
            ) : (
              <NavLink
                style={{ textDecoration: "none", color: "white" }}
                to="/login"
              >
                <Button color="inherit">Login</Button>
              </NavLink>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
