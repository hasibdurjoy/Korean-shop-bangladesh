import { Box, Button, CircularProgress, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import StarRatings from "react-star-ratings";
import { getFunction } from "../../../Api/CallApis";
import Responsive from "./CarouselResponsive";
import useStyles from "./MagnifierFeaturedTopRatedCarousel.style";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFeaturedProduct = async () => {
    setLoading(true);
    try {
      const offerData = await getFunction(
        "https://dry-tundra-71318.herokuapp.com/products/featured"
      );
      setFeaturedProducts(offerData.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getFeaturedProduct();
  }, []);

  return (
    <Box className="root" sx={{ flexGrow: 1, mx: "auto", mt: 2, mb: 7 }}>
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
        <Paper sx={{ p: 3, borderRadius: "20px" }} elevation={24}>
          <div className={classes.carouselTop}>
            <div
              className={classes.displayFlex}
              style={{
                gap: "50px",
              }}
            >
              <h3 style={{ borderBottom: "5px solid #e85d04" }}>
                Featured Products
              </h3>
            </div>
            <div>
              <Button
                variant="contained"
                style={{ backgroundColor: "#e85d04" }}
                onClick={() => {
                  navigate("/products");
                }}
              >
                View All Products
              </Button>
            </div>
          </div>
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={Responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="transform 2000ms ease-in-out"
            transitionDuration={2000}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            partialVisible={true}
          >
            {featuredProducts.map((data) => {
              return (
                <>
                  <Paper
                    key={data.id}
                    className={classes.productCardRoot}
                    onClick={() => {
                      navigate(`/product/${data._id}`);
                      window.scrollTo(0, 0);
                    }}
                    elevation={10}
                    variant="outlined"
                  >
                    <div className={classes.offCardRoot}>
                      OFF
                      <span className={classes.offPercentButton}>
                        {Math.floor(
                          ((data.price - data.discountPrice) / data.price) * 100
                        )}
                        %
                      </span>
                    </div>
                    <img
                      src={data.img}
                      alt=""
                      width="90%"
                      sx={{ mx: "auto" }}
                      className={classes.productImage}
                    />
                    <div
                      style={{
                        textAlign: "start",
                        fontSize: "20px",
                        padding: "10px",
                      }}
                    >
                      <span
                        style={{
                          textDecoration: data.discountPrice
                            ? "line-through"
                            : "",
                          marginLeft: "10px",
                          marginRight: "20px",
                        }}
                      >
                        Tk. {data.price}
                      </span>
                      {data.discountPrice && (
                        <span style={{ color: "red" }}>
                          Tk. {data.discountPrice}
                        </span>
                      )}
                      <StarRatings
                        rating={parseInt(data.rating)}
                        starRatedColor="#e85d04"
                        starDimension="20px"
                        starSpacing="5px"
                      />
                      <h5>{data.title}</h5>
                    </div>
                  </Paper>
                </>
              );
            })}
          </Carousel>
        </Paper>
      )}
    </Box>
  );
};

export default FeaturedProducts;
