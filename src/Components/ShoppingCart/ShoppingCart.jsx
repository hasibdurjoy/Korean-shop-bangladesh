import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { DataProvider } from "../../context/DataProvider";
import GetAllProducts from "../../hooks/GetAllProducts";
import useCart from "../../hooks/useCart";
import { removeFromDb } from "../../Utilities/FakeDatabase";
import useStyles from "./ShoppingCart.style";

const ShoppingCart = () => {
  const classes = useStyles();
  const { handleHit } = useContext(DataProvider);
  const [AllProducts] = GetAllProducts();
  const [cart, setCart] = useCart(AllProducts);
  const [subtotal, setSubtotal] = useState(0);
  // console.log(AllProducts, cart);

  const handleRemove = (id) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
    removeFromDb(id);
    handleHit();
  };
  useEffect(() => {
    let sub = 0;
    cart.map((it) => {
      sub += it.discountPrice * it.orderQuantity;
    });
    setSubtotal(sub);
  }, [cart]);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div style={{ height: "90%", overflow: "auto" }}>
            {cart.map((sItem) => {
              return (
                <Paper elevation={5} sx={{ mb: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} md={4}>
                      <img
                        src={sItem.img}
                        alt=""
                        style={{ width: "100%", height: "100px" }}
                      />
                    </Grid>
                    <Grid item xs={8} md={8}>
                      <p style={{ margin: "0px" }}>{sItem.title}</p>
                      <span>
                        Price:{sItem.discountPrice} Quantity:
                        {sItem.orderQuantity}
                      </span>
                      <p>Total: {sItem.discountPrice * sItem.orderQuantity}</p>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleRemove(sItem.id);
                    }}
                  >
                    Remove
                  </Button>
                  <hr />
                </Paper>
              );
            })}
          </div>
          <div style={{ position: "relative", bottom: 0 }}>
            <h3 style={{ backgroundColor: "white" }}>
              Subtotal : {subtotal}Tk{" "}
            </h3>
            <Button variant="contained">View Cart</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingCart;
