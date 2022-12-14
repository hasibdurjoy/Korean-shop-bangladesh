import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  Modal,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { getFunction } from "../../Api/CallApis";
import { useNavigate } from "react-router-dom";
import { DataProvider } from "../../context/DataProvider";
import useCart from "../../hooks/useCart";
import { addToDb } from "../../Utilities/FakeDatabase";
import AddedOnCart from "../ConfirmAddToCart/AddedOnCart";

const ProductDetailOverview = () => {
  const params = useParams();
  const navigate = useNavigate();
  //context
  const { data, handleHit } = useContext(DataProvider);

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [topTenProduct, setTopTenProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [addedOnCartModalOpen, setAddedOnCartModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleAddedOnCartModalOpen = (data) => {
    setModalData(data);
    setAddedOnCartModalOpen(true);
    setQuantity(1);
  };
  const handleAddedOnCartModalState = () => {
    setAddedOnCartModalOpen(!addedOnCartModalOpen);
  };

  const getProductDetails = async () => {
    setLoading(true);
    try {
      const products = await getFunction(
        `https://dry-tundra-71318.herokuapp.com/product/${params.productId}`
      );
      setProduct(products.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getTopTenProducts = async () => {
    try {
      const products = await getFunction(
        "https://dry-tundra-71318.herokuapp.com/products/bestSelling"
      );
      setTopTenProduct(products.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [cart, setCart] = useCart(product);
  const handleAddToCart = (product) => {
    const exists = cart.find((pd) => pd.id === product.id);
    let newCart = [];
    if (exists) {
      const rest = cart.filter((pd) => pd.id !== product.id);
      exists.orderQuantity = exists.orderQuantity + quantity;
      newCart = [...rest, product];
    } else {
      delete product.description;
      delete product.review;
      delete product.specialCategory;
      delete product.type;
      product.orderQuantity = quantity;
      newCart = [...cart, product];
    }
    setCart(newCart);
    // save to local storage (for now)
    addToDb(product.id, quantity);
    // handleHit();
  };

  useEffect(() => {
    getTopTenProducts();
  }, []);

  useEffect(() => {
    getProductDetails();
  }, [params]);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <Box sx={{ mx: "auto", mt: "80px", mb: 5 }} className="root">
      <Paper sx={{ mt: 5, p: 3 }} elevation={15}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              height: "50vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <img
                src={product.img}
                alt=""
                style={{ height: "500px", width: "100%", borderRadius: "20px" }}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <h4>{product.title}</h4>
              <div>
                <StarRatings
                  rating={parseInt(product.rating)}
                  starRatedColor="#e85d04"
                  starDimension="20px"
                  starSpacing="5px"
                />
              </div>
              <p>Estimate Shipping Time: 7 Days</p>
              <hr />
              <Grid
                container
                spacing={1}
                style={{ alignItems: "center", marginTop: "10px" }}
              >
                <Grid item xs={3} md={3}>
                  <p>Sold By :</p>
                </Grid>
                <Grid item xs={9} md={9}>
                  <h3 style={{ textAlign: "start" }}>Company name</h3>
                </Grid>
              </Grid>
              <hr />
              <Grid
                container
                spacing={1}
                style={{ alignItems: "center", marginTop: "10px" }}
              >
                <Grid item xs={3} md={3}>
                  <p>Price :</p>
                </Grid>
                <Grid item xs={9} md={9}>
                  <h4
                    style={{
                      textDecoration: "line-through",
                      textAlign: "start",
                    }}
                  >
                    TK {product.price}/{product.quantity}
                  </h4>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                style={{ alignItems: "center", marginTop: "10px" }}
              >
                <Grid item xs={3} md={3}>
                  <p>Discount Price :</p>
                </Grid>
                <Grid item xs={9} md={9}>
                  <h2 style={{ color: "#e85d04" }}>
                    {product.discountPrice}{" "}
                    <span style={{ fontSize: "20px", color: "black" }}>
                      /{product.quantity}
                    </span>
                  </h2>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                style={{ alignItems: "center", marginTop: "10px" }}
              >
                <Grid item xs={3} md={3}>
                  <p>Quantity :</p>
                </Grid>
                <Grid item xs={9} md={9}>
                  <h4>
                    <Button
                      style={{ fontSize: "20px" }}
                      onClick={() => {
                        quantity > 1 && setQuantity(quantity - 1);
                      }}
                    >
                      -
                    </Button>
                    {quantity}
                    <Button
                      style={{ fontSize: "20px" }}
                      onClick={() => {
                        quantity < 5 && setQuantity(quantity + 1);
                      }}
                    >
                      +
                    </Button>
                  </h4>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                style={{ alignItems: "center", marginTop: "10px" }}
              >
                <Grid item xs={3} md={3}>
                  <p>Total :</p>
                </Grid>
                <Grid item xs={9} md={9}>
                  <h2 style={{ color: "#e85d04" }}>
                    {product.discountPrice * quantity}
                  </h2>
                </Grid>
              </Grid>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "100px",
                  marginTop: "30px",
                }}
              >
                <Button
                  variant="outlined"
                  style={{ borderColor: "#e85d04", color: "black" }}
                  onClick={() => {
                    handleAddToCart(product);
                    handleAddedOnCartModalOpen(product);
                  }}
                >
                  Add To Cart
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#e85d04" }}
                >
                  Buy Now
                </Button>
              </div>
            </Grid>
          </Grid>
        )}
      </Paper>
      <Grid container spacing={3} sx={{ mt: 5 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }} elevation={10}>
            <h3>Top Selling Products</h3>
            <hr />
            {topTenProduct?.map((data) => {
              return (
                <>
                  <Paper
                    key={data.id}
                    onClick={() => {
                      navigate(`/product/${data._id}`);
                      window.scrollTo(0, 0);
                    }}
                    variant="outlined"
                    sx={{ px: 3, py: 2, mb: 2 }}
                    style={{ cursor: "pointer" }}
                  >
                    <Grid
                      container
                      spacing={2}
                      style={{ alignItems: "center" }}
                    >
                      <Grid item xs={4} md={4}>
                        <img
                          src={data.img}
                          alt=""
                          width="100%"
                          sx={{ mx: "auto" }}
                        />
                      </Grid>
                      <Grid item xs={8} md={8}>
                        <h6>{data.title}</h6>
                        <StarRatings
                          rating={parseInt(data.rating)}
                          starRatedColor="#e85d04"
                          starDimension="20px"
                          starSpacing="5px"
                        />
                        <div
                          style={{
                            textAlign: "start",
                            fontSize: "20px",
                            padding: "10px",
                          }}
                        >
                          {data.discountPrice ? (
                            <span style={{ color: "red" }}>
                              Tk. {data.discountPrice}
                            </span>
                          ) : (
                            <span style={{ color: "red" }}>
                              Tk. {data.price}
                            </span>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                </>
              );
            })}
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }} elevation={10}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Description" {...a11yProps(0)} />
                  <Tab label="Review" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <h6>{product.description}</h6>
              </TabPanel>
              {product?.review ? (
                <TabPanel value={value} index={1}>
                  {product?.review?.map((review) => {
                    return (
                      <Paper elevation={15} sx={{ p: 4, mb: 3 }}>
                        <h2>{review.name}</h2>
                        <div>
                          <StarRatings
                            rating={parseInt(review?.review) || 0}
                            starRatedColor="#e85d04"
                            starDimension="20px"
                            starSpacing="5px"
                          />
                        </div>
                        <h6>{review.description}</h6>
                      </Paper>
                    );
                  })}
                </TabPanel>
              ) : (
                <TabPanel value={value} index={1}>
                  <h2>No Review Available</h2>
                </TabPanel>
              )}
            </Box>
          </Paper>
          <Paper sx={{ p: 3, mt: 3 }} elevation={10}>
            <h3>Related Products</h3>
            <hr />
          </Paper>
        </Grid>
      </Grid>
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
          product={modalData}
          quantity={quantity}
          handleClose={handleAddedOnCartModalState}
        />
      </Modal>
    </Box>
  );
};

export default ProductDetailOverview;
