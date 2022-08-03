import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetAllProducts from "../../hooks/GetAllProducts";
import useCart from "../../hooks/useCart";
import { removeFromDb } from "../../Utilities/FakeDatabase";

import SingleCartItem from "./SingleCartItem";

const CartDetails = () => {
  const navigate = useNavigate();
  const [AllProducts] = GetAllProducts();
  const [cart, setCart] = useCart(AllProducts);

  const [subtotal, setSubtotal] = useState(0);

  const handleRemove = (id) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
    removeFromDb(id);
    // handleHit();
  };

  useEffect(() => {
    let sub = 0;
    cart.map((it) => {
      sub += it.discountPrice * it.orderQuantity;
    });
    setSubtotal(sub);
  }, [cart]);

  return (
    <Box sx={{ width: "80%", mx: "auto", mt: "80px", mb: 5 }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <h6>Product</h6>
                </TableCell>
                <TableCell>
                  <h6>Price</h6>
                </TableCell>
                <TableCell>
                  <h6>Tax</h6>
                </TableCell>
                <TableCell>
                  <h6>Quantity</h6>
                </TableCell>
                <TableCell>
                  <h6>Total</h6>
                </TableCell>
                <TableCell>
                  <h6>Remove</h6>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => {
                return (
                  <SingleCartItem item={item} handleRemove={handleRemove} />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <hr />
        <div
          style={{
            padding: "0 20px 30px ",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>Subtotal:</h3>
            <h3>{subtotal}</h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Button
              variant="outlined"
              style={{ borderColor: "#e85d04", color: "black" }}
              onClick={() => {
                navigate("/products");
              }}
            >
              Back To Shopping
            </Button>
            <Button variant="contained" style={{ backgroundColor: "#e85d04" }}>
              Proceed To Checkout
            </Button>
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default CartDetails;
