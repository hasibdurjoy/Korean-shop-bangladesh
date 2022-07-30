import { Box, Button, Grid, Paper } from "@mui/material";
import React from "react";
import useStyles from "./TopTenSection.style";

const TopTenSection = () => {
  const classes = useStyles();

  const fakeData = [
    {
      id: 1,
      img: "https://magnificmart.com/public/uploads/all/Z4laJQejEhxOY5j9l4so6HkIJ4M7kgAboXwMHXCO.jpg",
      title: "Cleanser",
    },
    {
      id: 2,
      img: "https://magnificmart.com/public/uploads/all/gXKQPIhbQAqT2Ux5DPMDDPCT4mBkLD62TBCP9sbc.jpg",
      title: "Sunscreem",
    },
    {
      id: 3,
      img: "https://magnificmart.com/public/uploads/all/NfqAIQso9VWEsxr9K2EnEyorSlsfI8RfNXGesDR6.jpg",
      title: "Cream",
    },
    {
      id: 4,
      img: "https://magnificmart.com/public/uploads/all/lqe8BBN1eWi3hNrrJ0WnKgD52WFby4bScOo5lpCU.jpg",
      title: "Toner",
    },
    {
      id: 5,
      img: "https://magnificmart.com/public/uploads/all/nuNYR0BBg6gWZwR78RMbEU1Bn6TxoKFdcRi8ozyq.jpg",
      title: "Kit",
    },
    {
      id: 6,
      img: "https://magnificmart.com/public/uploads/all/X0rhH9fqC1zxxuxekjMKHDp1mFaMds7hrfFTgnur.jpg",
      title: "Pad",
    },
  ];
  const fakeData2 = [
    {
      id: 1,
      img: "https://magnificmart.com/public/uploads/all/brand_01.jpg",
      title: "Some By Mi",
    },
    {
      id: 2,
      img: "https://magnificmart.com/public/uploads/all/brand_02.jpg",
      title: "3W CLINIC",
    },
    {
      id: 3,
      img: "https://magnificmart.com/public/uploads/all/brand_03.jpg",
      title: "COSRX",
    },
    {
      id: 4,
      img: "https://magnificmart.com/public/uploads/all/brand_04.jpg",
      title: "innisfree",
    },
    {
      id: 5,
      img: "https://magnificmart.com/public/uploads/all/brand_11.jpg",
      title: "NEOGEN",
    },
    {
      id: 6,
      img: "https://magnificmart.com/public/uploads/all/brand_12.jpg",
      title: "Sur.Medic+",
    },
  ];

  return (
    <Box
      className={classes.root}
      sx={{ maxWidth: "80%", flexGrow: 1, mx: "auto", mt: 2, mb: 7 }}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <div sx={{ p: 3, borderRadius: "20px" }}>
            <div className={classes.carouselTop}>
              <div
                className={classes.displayFlex}
                style={{
                  gap: "50px",
                }}
              >
                <h3 style={{ borderBottom: "5px solid #e85d04" }}>
                  Top 10 Categories
                </h3>
              </div>
              <Button
                variant="contained"
                style={{ backgroundColor: "#e85d04" }}
              >
                View All Categories
              </Button>
            </div>
            <Grid container spacing={2}>
              {fakeData.map((data) => {
                return (
                  <Grid item xs={12} md={6}>
                    <Paper
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        padding: "5px",
                      }}
                    >
                      <img
                        src={data.img}
                        alt=""
                        style={{ height: "80px", width: "80px" }}
                      />
                      <h5>{data.title}</h5>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div sx={{ p: 3, borderRadius: "20px" }}>
            <div className={classes.carouselTop}>
              <div
                className={classes.displayFlex}
                style={{
                  gap: "50px",
                }}
              >
                <h3 style={{ borderBottom: "5px solid #e85d04" }}>
                  Top 10 Brands
                </h3>
              </div>
              <Button
                variant="contained"
                style={{ backgroundColor: "#e85d04" }}
              >
                View All Brands
              </Button>
            </div>
            <Grid container spacing={2}>
              {fakeData2.map((data) => {
                return (
                  <Grid item xs={12} md={6}>
                    <Paper
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        padding: "5px",
                      }}
                    >
                      <img
                        src={data.img}
                        alt=""
                        style={{ height: "80px", width: "80px" }}
                      />
                      <h5>{data.title}</h5>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopTenSection;
