import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { DataProvider } from "../../context/DataProvider";
import Product from "./Product";

const Products = () => {
  const { AllProducts } = useContext(DataProvider);
  return (
    <Box sx={{ mx: "auto" }} style={{ marginTop: "80px" }} className="root">
      <Grid container spacing={2}>
        <Grid item xs={0} md={2}>
          <h2>Filter</h2>
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid container spacing={2}>
            {AllProducts.map((product) => {
              return <Product key={product.id} product={product} />;
            })}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Products;
