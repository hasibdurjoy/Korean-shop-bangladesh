import { useEffect } from "react";
import { useState } from "react";
import { getFunction } from "../Api/CallApis";

const GetAllProducts = () => {
  const [AllProducts, setProducts] = useState([]);

  const getTopTenProducts = async () => {
    try {
      const products = await getFunction(
        "https://dry-tundra-71318.herokuapp.com/products"
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
