import { Button, Grid, Modal, Paper } from "@mui/material";
import React, { useContext, useState } from "react";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import ConfirmAddToCart from "../ConfirmAddToCart/ConfirmAddToCart";
import AddedOnCart from "../ConfirmAddToCart/AddedOnCart";
import useCart from "../../hooks/useCart";
import { addToDb } from "../../Utilities/FakeDatabase";
import { DataProvider } from "../../context/DataProvider";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const { handleHit } = useContext(DataProvider);
  const [cart, setCart] = useCart(product);
  const [quantity, setQuantity] = useState(0);
  const [addedOnCartModalOpen, setAddedOnCartModalOpen] = useState(false);
  const [addedOnCartModalData, setAddedOnCartModalData] = useState({});

  const [addToCartModalOpen, setAddToCartModalOpen] = useState(false);
  const [addToCartModalData, setAddToCartModalData] = useState({});

  const handleAddToCartModalOpen = (data) => {
    setAddToCartModalData(data);
    setAddToCartModalOpen(true);
  };

  const handleAddToCartModalState = () => {
    setAddToCartModalOpen(false);
  };

  const handleAddedOnCartModalState = () => {
    setAddedOnCartModalOpen(!addedOnCartModalOpen);
  };

  const handleAddToCart = (product, quantity) => {
    const exists = cart.find((pd) => pd.id === product.id);
    let newCart = [];
    if (exists) {
      const rest = cart.filter((pd) => pd.id !== product.id);
      exists.orderQuantity = exists.orderQuantity + quantity;
      newCart = [...rest, product];
    } else {
      product.orderQuantity = quantity;
      newCart = [...cart, product];
    }
    setCart(newCart);
    // save to local storage (for now)
    addToDb(product.id, quantity);
    setAddToCartModalOpen(false);
    setAddedOnCartModalData(product);
    setQuantity(quantity);
    setAddedOnCartModalOpen(true);
    handleHit();
  };

  return (
    <Grid item xs={12} md={4}>
      <Paper
        variant="outlined"
        sx={{ p: 2, cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/product/${product._id}`);
          window.scrollTo(0, 0);
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={product.img}
            alt=""
            style={{ height: "300px", width: "100%", alignItems: "center" }}
          />
        </div>
        <hr />
        <h6>{product.title}</h6>
        <StarRatings
          rating={product.rating}
          starRatedColor="#e85d04"
          starDimension="20px"
          starSpacing="5px"
        />
        <div>
          Price :{" "}
          <span
            style={{
              textDecoration: "line-through",
              textAlign: "start",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            TK {product.price}/{product.quantity}
          </span>
        </div>
        <div>
          Discount Price :{" "}
          <span style={{ color: "#e85d04", fontWeight: 600 }}>
            {product.discountPrice}{" "}
            <span style={{ fontSize: "20px", color: "black" }}>
              /{product.quantity}
            </span>
          </span>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            style={{ borderColor: "#e85d04", color: "black" }}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCartModalOpen(product);
            }}
          >
            Add To Cart
          </Button>
          <Button
            variant="contained"
            fullWidth
            style={{ backgroundColor: "#e85d04" }}
          >
            Buy Now
          </Button>
        </div>
      </Paper>
      <Modal
        open={addToCartModalOpen}
        onClose={handleAddedOnCartModalState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ConfirmAddToCart
          handleAddToCart={handleAddToCart}
          product={addToCartModalData}
          handleClose={handleAddToCartModalState}
        />
      </Modal>
      <Modal
        open={addedOnCartModalOpen}
        onClose={handleAddedOnCartModalState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AddedOnCart
          product={addedOnCartModalData}
          quantity={quantity}
          handleClose={handleAddedOnCartModalState}
        />
      </Modal>
    </Grid>
  );
};

export default Product;
