import { Box, Button, Container, Paper } from "@mui/material";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import StarRatings from "react-star-ratings";
import useStyles from "./MagnifierFeaturedTopRatedCarousel.style";

const BestSelling = () => {
  const classes = useStyles();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const fakeData = [
    {
      id: 1,
      img: "https://magnificmart.com/public/uploads/all/260_01.jpg",
      price: "450",
      discountPrice: "350",
      title: "Technic 15 Color Eye Shadow Palette - Goddess - 30g",
      rating: 5,
      off: 20,
    },
    {
      id: 2,
      img: "https://magnificmart.com/public/uploads/all/266_01.jpg",
      price: "450",
      discountPrice: "350",
      title: "Technic 15 Color Eye Shadow Palette - Goddess - 30g",
      rating: 5,
      off: 20,
    },
    {
      id: 3,
      img: "https://magnificmart.com/public/uploads/all/265_01.jpg",
      price: "450",
      discountPrice: "350",
      title: "Technic 15 Color Eye Shadow Palette - Goddess - 30g",
      rating: 5,
      off: 20,
    },
    {
      id: 4,
      img: "https://magnificmart.com/public/uploads/all/264_01.jpg",
      price: "450",
      discountPrice: "350",
      title: "Technic 15 Color Eye Shadow Palette - Goddess - 30g",
      rating: 5,
      off: 20,
    },
    {
      id: 5,
      img: "https://magnificmart.com/public/uploads/all/263_01.jpg",
      price: "450",
      discountPrice: "350",
      title: "Technic 15 Color Eye Shadow Palette - Goddess - 30g",
      rating: 5,
      off: 20,
    },

    {
      id: 6,
      img: "https://magnificmart.com/public/uploads/all/267_01.jpg",
      price: "450",
      discountPrice: "350",
      title: "Technic 15 Color Eye Shadow Palette - Goddess - 30g",
      rating: 5,
      off: 20,
    },

    {
      id: 7,
      img: "https://magnificmart.com/public/uploads/all/267_01.jpg",
      price: "450",
      discountPrice: "350",
      title: "Technic 15 Color Eye Shadow Palette - Goddess - 30g",
      rating: 5,
      off: 20,
    },
  ];

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
            <h3 style={{ borderBottom: "5px solid #e85d04" }}>Best Selling</h3>
          </div>
          <div>
            <Button variant="contained" style={{ backgroundColor: "#e85d04" }}>
              View All Products
            </Button>
          </div>
        </div>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          // autoPlay={this.props.deviceType !== "mobile" ? true : false}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={2000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {fakeData.map((data) => {
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

export default BestSelling;
