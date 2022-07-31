import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFunction } from "../../Api/CallApis";

const ProductDetailOverview = () => {
  const params = useParams();
  console.log(params);
  const [product, setProduct] = useState([]);

  const getProductDetails = async () => {
    try {
      const products = await getFunction(
        "https://salty-ravine-02871.herokuapp.com/products"
      );
      const prod = products.data.find((p) => p.id === params.productId);
      console.log(prod);
      setProduct(products.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <div>
      <h3>This is product details page</h3>
    </div>
  );
};

export default ProductDetailOverview;
