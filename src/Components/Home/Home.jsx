import React from "react";
import BestSelling from "./Carousel/BestSelling";
import FeaturedProducts from "./Carousel/FeaturedProducts";
import MagnifierOfferCarousel from "./Carousel/MagnifierOfferCarousel";
import MainBanner from "./Carousel/MainBanner";

const Home = () => {
  return (
    <div>
      <MainBanner />
      <MagnifierOfferCarousel />
      <FeaturedProducts />
      <BestSelling />
    </div>
  );
};

export default Home;
