import { CircularProgress, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { DataProvider } from "../../context/DataProvider";
import Product from "./Product";

const Products = () => {
  const { AllProducts } = useContext(DataProvider);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (AllProducts.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [AllProducts]);

  return (
    <Box sx={{ mx: "auto" }} style={{ marginTop: "80px" }} className="root">
      {loading ? (
        <Box
          sx={{
            display: "flex",
            height: "50vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
      )}
    </Box>
  );
};

export default Products;
