import { Box, Button, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import StarRatings from "react-star-ratings";
import { getFunction } from "../../../Api/CallApis";
import Responsive from "./CarouselResponsive";
import useStyles from "./MagnifierFeaturedTopRatedCarousel.style";

const MagnifierOfferCarousel = () => {
  const classes = useStyles();
  const [magnifierOffer, setMagnifierOffer] = useState([]);

  const getOfferProduct = async () => {
    try {
      const offerData = await getFunction("./MagnificOffer.json");
      setMagnifierOffer(offerData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOfferProduct();
  }, []);

  const time2 = new Date();

  return (
    <Box
      className={classes.root}
      sx={{ maxWidth: "80%", flexGrow: 1, mx: "auto", mt: 2, mb: 7 }}
    >
      <Paper sx={{ p: 3, borderRadius: "20px" }}>
        <div className={classes.carouselTop}>
          <div
            className={classes.displayFlex}
            style={{
              gap: "50px",
            }}
          >
            <h3 style={{ borderBottom: "5px solid #e85d04" }}>
              Magnific Offer
            </h3>
            <div className={classes.displayFlex}>
              <h4>{time2.toLocaleTimeString()}</h4>
            </div>
          </div>
          <div>
            <Button variant="contained" style={{ backgroundColor: "#e85d04" }}>
              View More
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
          removeArrowOnDeviceType={["tablet", "mobile"]}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          partialVisible={true}
        >
          {magnifierOffer.map((data) => {
            return (
              <>
                <Paper key={data.id} className={classes.productCardRoot}>
                  <div className={classes.offCardRoot}>
                    OFF
                    <span className={classes.offPercentButton}>
                      {data.off}%
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
                      rating={data.rating}
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
    </Box>
  );
};

export default MagnifierOfferCarousel;
