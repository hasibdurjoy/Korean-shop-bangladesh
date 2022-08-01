import { useEffect } from "react";
import { useState } from "react";
import { getFunction } from "../Api/CallApis";

const GetAllProducts = () => {
  const [AllProducts, setProducts] = useState([]);

  const getTopTenProducts = async () => {
    try {
      const products = await getFunction(
        "https://raw.githubusercontent.com/hasibdurjoy/Korean-shop-bangladesh/main/public/Products.json"
      );
      setProducts(products.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTopTenProducts();
  }, []);
  return [AllProducts, setProducts];
};

export default GetAllProducts;
