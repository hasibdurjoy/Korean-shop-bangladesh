import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Modal } from "@mui/material";
import ShoppingCart from "../../ShoppingCart/ShoppingCart";
import GetAllProducts from "../../../hooks/GetAllProducts";
import useCart from "../../../hooks/useCart";
import { DataProvider } from "../../../context/DataProvider";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function Header(props) {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [itemInCart, setItemInCart] = useState(0);
  const handleClose = () => setOpen(false);
  const { hitDb } = useContext(DataProvider);

  const [AllProducts] = GetAllProducts();
  const [cart, setCart] = useCart(AllProducts);

  useEffect(() => {
    const savedCart = localStorage.getItem("shopping_cart");
    savedCart && setItemInCart(Object.keys(JSON.parse(savedCart)).length);
  }, [hitDb]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Korean Shop Bangladesh
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
              <Button color="inherit">Home</Button>
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button color="inherit">Products</Button>
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <span
              onClick={() => {
                setOpen(true);
              }}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button color="inherit">
                Cart{" "}
                <Button variant="contained" style={{ color: "red" }}>
                  ({itemInCart || cart?.length})
                </Button>
              </Button>
            </span>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            {user?.email ? (
              <span>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/dashboard"
                >
                  <Button color="inherit">Dashboard</Button>
                </NavLink>
                <Button onClick={logOut} color="inherit">
                  Logout
                </Button>
              </span>
            ) : (
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/login"
              >
                <Button color="inherit">Login</Button>
              </NavLink>
            )}
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Korean Shop Bangladesh
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
              <Button color="inherit">Home</Button>
            </Link>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">Products</Button>
            </Link>
            <span
              onClick={() => {
                setOpen(true);
              }}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">
                Cart{" "}
                <Button variant="contained" style={{ color: "red" }}>
                  ({itemInCart || cart?.length})
                </Button>
              </Button>
            </span>
            {user?.email ? (
              <span>
                <NavLink
                  style={{ textDecoration: "none", color: "white" }}
                  to="/dashboard"
                >
                  <Button color="inherit">Dashboard</Button>
                </NavLink>
                <Button onClick={logOut} color="inherit">
                  Logout
                </Button>
              </span>
            ) : (
              <NavLink
                style={{ textDecoration: "none", color: "white" }}
                to="/login"
              >
                <Button color="inherit">Login</Button>
              </NavLink>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ShoppingCart handleClose={handleClose} />
        </Modal>
      </div>
    </Box>
  );
}

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;
