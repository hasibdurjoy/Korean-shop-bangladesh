import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Grid, Paper } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath:
      "https://magnificmart.com/public/uploads/all/zZVVUnybNyLswEJsVXPWnZ0dT8MDtpJwQ6o2zGrP.png",
  },
  {
    imgPath:
      "https://magnificmart.com/public/uploads/all/frw1xXdCHmBX6QYzsIUsccNE5leM02cmjjA4UZY1.jpg",
  },
  {
    imgPath:
      "https://magnificmart.com/public/uploads/all/mkjrxMED6JvNuyjcZOR78P1SNAEvwNklkl6z3PAU.png",
  },
  {
    imgPath:
      "https://magnificmart.com/public/uploads/all/cwcmZljRItOamJRFOp34xkx5TzC4FmT6VMHq6zfk.png",
  },
];

const fakeData = [
  {
    id: 1,
    img: "https://magnificmart.com/public/uploads/all/034_01.jpg",
    price: "2000",
    discountPrice: "1700",
  },
  {
    id: 2,
    img: "https://magnificmart.com/public/uploads/all/035_01.jpg",
    price: "2000",
    discountPrice: "1700",
  },
  {
    id: 3,
    img: "https://magnificmart.com/public/uploads/all/040_01.jpg",
    price: "2100",
    discountPrice: "1600",
  },
  {
    id: 4,
    img: "https://magnificmart.com/public/uploads/all/065_01.jpg",
    price: "2500",
    discountPrice: "2100",
  },
  {
    id: 5,
    img: "https://magnificmart.com/public/uploads/all/256_01.jpg",
    price: "1900",
    discountPrice: "1400",
  },
];

const MainBanner = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: "80%", flexGrow: 1, mx: "auto", mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <div>
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {images.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                      component="img"
                      sx={{
                        height: "70vh",
                        display: "block",
                        maxWidth: "100%",
                        overflow: "hidden",
                        width: "100%",
                        mx: "auto",
                      }}
                      src={step.imgPath}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </div>
        </Grid>
        <Grid item xs={2}>
          <Paper
            sx={{
              height: "70vh",
              display: "block",
              maxWidth: "100%",
              width: "100%",
              mx: "auto",
              backgroundColor: "rgb(252 231 222)",
              textAlign: "center",
              px: 1,
              py: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <h5>Todays Deal</h5>
              <Button variant="contained" sx={{ backgroundColor: "red", p: 0 }}>
                Hot
              </Button>
            </div>
            <div style={{ height: "60vh", overflowY: "auto" }}>
              {fakeData.map((data) => {
                return (
                  <>
                    <Paper
                      key={data.id}
                      sx={{
                        backgroundColor: "white",
                        textAlign: "center",
                        borderRadius: "20px",
                      }}
                    >
                      <img
                        src={data.img}
                        alt=""
                        width="90%"
                        sx={{ mx: "auto" }}
                        style={{
                          height: "150px",
                          padding: "5px",
                          borderRadius: "20px",
                        }}
                      />
                      <h4>Tk. {data.price}</h4>
                    </Paper>
                  </>
                );
              })}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainBanner;
