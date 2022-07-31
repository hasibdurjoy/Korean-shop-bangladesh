import { Button, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { getFunction } from "../../Api/CallApis";

const ProductDetailOverview = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const getProductDetails = async () => {
    try {
      const products = await getFunction(
        "https://raw.githubusercontent.com/hasibdurjoy/Korean-shop-bangladesh/main/public/Products.json"
      );
      setProduct(products.data.find((p) => p.id == params.productId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <Box sx={{ width: "80%", mx: "auto", mt: 3, mb: 5 }}>
      <Paper sx={{ mt: 5, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <img
              src={product.img}
              alt=""
              style={{ height: "500px", width: "300px" }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <h4>{product.title}</h4>
            <div>
              <StarRatings
                rating={product.rating}
                starRatedColor="#e85d04"
                starDimension="20px"
                starSpacing="5px"
              />
            </div>
            <p>Estimate Shipping Time: 7 Days</p>
            <hr />
            <Grid container spacing={1}>
              <Grid item xs={3} md={3}>
                <p>Sold By :</p>
              </Grid>
              <Grid item xs={9} md={9}>
                <h3 style={{ textAlign: "start" }}>Company name</h3>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={3} md={3}>
                <p>Price :</p>
              </Grid>
              <Grid item xs={9} md={9}>
                <h4
                  style={{ textDecoration: "line-through", textAlign: "start" }}
                >
                  TK {product.price}/{product.quantity}
                </h4>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={3} md={3}>
                <p>Discount Price :</p>
              </Grid>
              <Grid item xs={9} md={9}>
                <h2>
                  {product.discountPrice}{" "}
                  <span style={{ fontSize: "20px" }}>/{product.quantity}</span>
                </h2>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
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
            <Grid container spacing={1}>
              <Grid item xs={3} md={3}>
                <p>Total :</p>
              </Grid>
              <Grid item xs={9} md={9}>
                <h4>{product.discountPrice * quantity}</h4>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProductDetailOverview;
