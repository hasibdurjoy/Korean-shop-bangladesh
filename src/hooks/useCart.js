import { useState, useEffect } from "react";
import { getStoredCart } from "../Utilities/FakeDatabase";

const useCart = (products) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (products.length) {
      const savedCart = getStoredCart();
      const storedCart = [];
      for (const id in savedCart) {
        console.log(typeof id);
        const addedProduct = products.find((product) => product.id == id);
        if (addedProduct) {
          // set quantity
          const quantity = savedCart[id];
          addedProduct.quantity = quantity;
          storedCart.push(addedProduct);
        }
      }
      console.log(storedCart);
      setCart(storedCart);
    }
  }, [products]);

  return [cart, setCart];
};

export default useCart;
