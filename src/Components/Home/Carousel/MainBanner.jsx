import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CircularProgress, Grid, Paper } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MainBanner.css";
import { getFunction } from "../../../Api/CallApis";

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
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const getBannerImage = async () => {
    setLoading(true);
    try {
      const imgData = await getFunction(
        "https://dry-tundra-71318.herokuapp.com/banners"
      );
      setImages(imgData.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getBannerImage();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, mx: "auto", mt: 2 }} className="root">
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
          <Grid item xs={12} md={10}>
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive}
              ssr={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="transform 2000ms ease-in-out"
              transitionDuration={2000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              // deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {images.map((image) => {
                return (
                  <>
                    <img
                      src={image.imgPath}
                      alt=""
                      // style={{ width: "100%", height: "70vh" }}
                      className="bannerImage"
                    />
                  </>
                );
              })}
            </Carousel>
          </Grid>
          <Grid item xs={12} md={2}>
            <Paper
              elevation={5}
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
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "red", p: 0 }}
                >
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
                        {data.discountPrice && (
                          <h4 style={{ color: "red" }}>
                            Tk. {data.discountPrice}
                          </h4>
                        )}
                        <h4
                          style={{
                            textDecoration: data.discountPrice
                              ? "line-through"
                              : "",
                          }}
                        >
                          Tk. {data.price}
                        </h4>
                      </Paper>
                    </>
                  );
                })}
              </div>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default MainBanner;
