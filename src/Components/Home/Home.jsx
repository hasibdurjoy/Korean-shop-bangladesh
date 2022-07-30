import React from "react";
import BestSelling from "./Carousel/BestSelling";
import FeaturedProducts from "./Carousel/FeaturedProducts";
import MagnifierOfferCarousel from "./Carousel/MagnifierOfferCarousel";
import MainBanner from "./Carousel/MainBanner";
import TopTenSection from "./TopTenSection/TopTenSection";

const Home = () => {
  return (
    <div>
      <MainBanner />
      <MagnifierOfferCarousel />
      <FeaturedProducts />
      <BestSelling />
      <TopTenSection />
    </div>
  );
};

export default Home;
