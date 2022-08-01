import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import GetAllProducts from "../../hooks/GetAllProducts";
import useCart from "../../hooks/useCart";
import useStyles from "./ShoppingCart.style";

const ShoppingCart = () => {
  const classes = useStyles();
  const [AllProducts] = GetAllProducts();
  const [cart, setCart] = useCart(AllProducts);
  // console.log(AllProducts, cart);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingCart;
