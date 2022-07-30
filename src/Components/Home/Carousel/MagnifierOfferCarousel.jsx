import { Box, Button, Paper } from "@mui/material";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import StarRatings from "react-star-ratings";
import useStyles from "./MagnifierFeaturedTopRatedCarousel.style";

const MagnifierOfferCarousel = () => {
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

  const hours = 1;
  const minutes = 59;
  const seconds = 50;

  const [over, setOver] = React.useState(false);
  const [time, setTime] = React.useState({
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: parseInt(seconds),
  });

  const tick = () => {
    if (over) return;
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0)
      setOver(true);
    else if (time.minutes === 0 && time.seconds === 0)
      setTime({
        hours: time.hours - 1,
        minutes: 59,
        seconds: 59,
      });
    else if (time.seconds === 0)
      setTime({
        hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 59,
      });
    else
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1,
      });
  };

  React.useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

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
              {/* <p>{`${time.hours.toString().padStart(2, "0")}:${time.minutes
              .toString()
              .padStart(2, "0")}:${time.seconds
              .toString()
              .padStart(2, "0")}`}</p>
            <div>{over ? "Time's up!" : ""}</div> */}
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
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          // autoPlay={this.props.deviceType !=== "mobile" ? true : false}
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

export default MagnifierOfferCarousel;
