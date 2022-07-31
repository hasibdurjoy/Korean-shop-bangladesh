import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import {
  FileText,
  ArrowBendUpLeft,
  WarningCircle,
  PlusCircle,
} from "phosphor-react";
import React from "react";
import useStyles from "./Footer.style";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div style={{ borderTop: "1px solid black" }}>
      <div>
        <div style={{ marginBottom: "30px" }}>
          <Box style={{ width: "80%" }} sx={{ mx: "auto" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={3}>
                <Paper
                  className={classes.footerIcon}
                  onClick={() => {
                    navigate("/terms");
                  }}
                  variant="outlined"
                >
                  <FileText size={45} style={{ color: "#e85d04" }} />
                  <h5>Terms & Conditions</h5>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper
                  className={classes.footerIcon}
                  onClick={() => {
                    navigate("/return-policy");
                  }}
                  variant="outlined"
                >
                  <ArrowBendUpLeft size={45} style={{ color: "#e85d04" }} />
                  <h5>Return Policy</h5>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper
                  className={classes.footerIcon}
                  onClick={() => {
                    navigate("/support-policy");
                  }}
                  variant="outlined"
                >
                  <PlusCircle size={45} style={{ color: "#e85d04" }} />
                  <h5>Support Policy</h5>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper
                  className={classes.footerIcon}
                  onClick={() => {
                    navigate("/privacy-policy");
                  }}
                  variant="outlined"
                >
                  <WarningCircle size={45} style={{ color: "#e85d04" }} />
                  <h5>Privacy Policy</h5>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <div>
        <div
          style={{
            backgroundColor: "#111723",
            color: "white",
            paddingBottom: "40px",
          }}
        >
          <Box sx={{ width: "80%", mx: "auto" }}>
            <Grid
              container
              spacing={3}
              style={{ justifyContent: "space-between" }}
            >
              <Grid item xs={12} md={6}>
                <img
                  src="https://magnificmart.com/public/uploads/all/Yf9Ke2EnaaLgj4iDXiJOLvXers8t2rE4hb54fhdx.png"
                  alt=""
                  height="50px"
                  width="50px"
                />
                <p>
                  Magnific Mart Limited is the largest E-commerce/Online-based
                  platform.We are committed to our valued customers to provide
                  100% authentic products in Bangladesh.
                </p>
                <p>
                  To connect and inspire with our valued clients that fulfill
                  their wants and needs and combine aggressive strategic
                  marketing with quality products and services at competitive
                  prices to provide the best assurance for consumers.
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    style={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      height: "40px",
                    }}
                  />
                  <Button variant="contained" style={{ height: "40px" }}>
                    Subscribe
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <h3>CONTACT INFO</h3>
                <p>Address:</p>
                <p>Uttara, Dhaka Division, Bangladesh</p>
                <p>Phone:</p>
                <p>+88 01958417079</p>
                <p>Email:</p>
                <p>support@magnificmart.com</p>
              </Grid>
              <Grid item xs={12} md={2}>
                <h3>MY ACCOUNT</h3>
                <p>Login</p>
                <p>Order History</p>
                <p>My Wishlist</p>
                <p>Track Order</p>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Footer;
