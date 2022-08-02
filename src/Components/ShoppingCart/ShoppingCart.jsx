import { Button, Card, CardContent, Grid, Paper } from "@mui/material";
import { X } from "phosphor-react";
import React, { useContext, useEffect, useState } from "react";
import { DataProvider } from "../../context/DataProvider";
import useCart from "../../hooks/useCart";
import { removeFromDb } from "../../Utilities/FakeDatabase";
import useStyles from "./ShoppingCart.style";

const ShoppingCart = () => {
  const classes = useStyles();
  const { handleHit, AllProducts } = useContext(DataProvider);
  const [cart, setCart] = useCart(AllProducts);
  const [subtotal, setSubtotal] = useState(0);

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
          <div style={{ height: "65vh", overflow: "auto" }}>
            {cart.map((sItem) => {
              return (
                <Paper variant="outlined" sx={{ mb: 3, px: 1, py: 1 }}>
                  <Grid container spacing={2} style={{ alignItems: "center" }}>
                    <Grid item xs={4} md={4}>
                      <img
                        src={sItem.img}
                        alt=""
                        style={{ width: "100%", height: "100px" }}
                      />
                    </Grid>
                    <Grid item xs={8} md={8}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <p style={{ margin: "0px" }}>{sItem.title}</p>
                          <span>
                            {sItem.orderQuantity}x {sItem.discountPrice}
                          </span>
                          <p>
                            Total: {sItem.discountPrice * sItem.orderQuantity}
                          </p>
                        </div>
                        <div>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              handleRemove(sItem.id);
                            }}
                          >
                            <X size={20} />
                          </Button>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })}
          </div>
          <div style={{ position: "relative", bottom: 0 }}>
            <h3 style={{ backgroundColor: "white" }}>
              Subtotal : {subtotal}Tk{" "}
            </h3>
            <div style={{ textAlign: "center" }}>
              <Button variant="contained">View Cart</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingCart;
