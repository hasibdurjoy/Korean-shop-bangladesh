import { Paper, Button, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "phosphor-react";

const AddedOnCart = ({ product, quantity, handleClose }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Paper sx={{ mt: 5, p: 3 }} elevation={15}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              handleClose();
            }}
          >
            <X size={20} />
          </Button>
        </div>
        <h2>Item Added To Cart!!</h2>
        <Paper variant="outlined" style={{ padding: "5px" }}>
          <Grid container spacing={4} style={{ alignItems: "center" }}>
            <Grid item xs={3} md={3}>
              <img
                src={product.img}
                alt=""
                style={{ height: "100px", width: "100px" }}
              />
            </Grid>
            <Grid item xs={8} md={8}>
              <h6>{product.title}</h6>
              <p>
                {product.discountPrice}x{quantity}
              </p>
              <p>Total : {product.discountPrice * quantity}</p>
            </Grid>
          </Grid>
        </Paper>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "30px",
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            style={{ borderColor: "#e85d04", color: "black" }}
            onClick={() => {
              handleClose();
              navigate("/products");
            }}
          >
            Back To Shopping
          </Button>
          <Button
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#e85d04" }}
            onClick={() => {
              handleClose();
              navigate("/cart");
            }}
          >
            Proceed To Checkout
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default AddedOnCart;
