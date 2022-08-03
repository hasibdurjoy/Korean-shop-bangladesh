import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Modal } from "@mui/material";
import ShoppingCart from "../../ShoppingCart/ShoppingCart";
import GetAllProducts from "../../../hooks/GetAllProducts";
import useCart from "../../../hooks/useCart";
import { DataProvider } from "../../../context/DataProvider";

const Header = () => {
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

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" style={{ position: "fixed" }}>
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
              to="/products"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">Products</Button>
            </Link>

            <div
              // to="/appointment"
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
            </div>
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
          <ShoppingCart />
        </Modal>
      </div>
    </div>
  );
};

export default Header;
