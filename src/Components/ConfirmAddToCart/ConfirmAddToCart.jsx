import { Button, Grid, Paper } from "@mui/material";
import { X } from "phosphor-react";
import React, { useState } from "react";
import StarRatings from "react-star-ratings";

const ConfirmAddToCart = ({ product, handleAddToCart, handleClose }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div style={{ width: "600px" }}>
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
        <Grid container spacing={5} style={{ alignItems: "center" }}>
          <Grid item xs={3} md={3}>
            <img
              src={product.img}
              alt=""
              style={{ height: "100%", width: "100%" }}
            />
          </Grid>
          <Grid item xs={9} md={9}>
            <h4>{product.title}</h4>
            <div>
              <StarRatings
                rating={parseInt(product.rating)}
                starRatedColor="#e85d04"
                starDimension="20px"
                starSpacing="5px"
              />
            </div>
            <hr />
            <Grid
              container
              spacing={1}
              style={{ alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={3} md={3}>
                <p>Price :</p>
              </Grid>
              <Grid item xs={9} md={9}>
                <h4
                  style={{
                    textDecoration: "line-through",
                    textAlign: "start",
                  }}
                >
                  TK {product.price}/{product.quantity}
                </h4>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              style={{ alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={3} md={3}>
                <p>Discount Price :</p>
              </Grid>
              <Grid item xs={9} md={9}>
                <h2 style={{ color: "#e85d04" }}>
                  {product.discountPrice}{" "}
                  <span style={{ fontSize: "20px", color: "black" }}>
                    /{product.quantity}
                  </span>
                </h2>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              style={{ alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={3} md={3}>
                <p>Quantity :</p>
              </Grid>
              <Grid item xs={9} md={9}>
                <h4>
                  <Button
                    style={{ fontSize: "20px" }}
                    onClick={() => {
                      quantity > 1 && setQuantity(quantity - 1);
                    }}
                  >
                    -
                  </Button>
                  {quantity}
                  <Button
                    style={{ fontSize: "20px" }}
                    onClick={() => {
                      quantity < 5 && setQuantity(quantity + 1);
                    }}
                  >
                    +
                  </Button>
                </h4>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              style={{ alignItems: "center", marginTop: "10px" }}
            >
              <Grid item xs={3} md={3}>
                <p>Total :</p>
              </Grid>
              <Grid item xs={9} md={9}>
                <h2 style={{ color: "#e85d04" }}>
                  {product.discountPrice * quantity}
                </h2>
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "100px",
                marginTop: "30px",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#e85d04", color: "white" }}
                onClick={() => {
                  handleAddToCart(product, quantity);
                }}
              >
                Add To Cart
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ConfirmAddToCart;
