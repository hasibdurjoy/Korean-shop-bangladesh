import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import React from "react";
import GetAllProducts from "../../hooks/GetAllProducts";
import useCart from "../../hooks/useCart";

import SingleCartItem from "./SingleCartItem";

const CartDetails = () => {
  const [AllProducts] = GetAllProducts();
  const [cart] = useCart(AllProducts);
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
                return <SingleCartItem item={item} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CartDetails;
