import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartDetails from "./Components/CartDetails/CartDetails";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login/Login";
import PrivateRoute from "./Components/Login/PrivateRoute/PrivateRoute";
import Register from "./Components/Login/Register/Register";
import PrivacyPolicy from "./Components/PolicyPages/PrivacyPolicy";
import ReturnPolicy from "./Components/PolicyPages/ReturnPolicy";
import SupportPolicy from "./Components/PolicyPages/SupportPolicy";
import TermsAndConditions from "./Components/PolicyPages/TermsAndConditions";
import ProductDetailOverview from "./Components/ProductDetail/ProductDetailOverview";
import Products from "./Components/Products/Products";
import Footer from "./Components/Shared/Footer/Footer";
import Header from "./Components/Shared/Header/Header";
import AuthProvider from "./context/AuthProvider";
import { DataProvider } from "./context/DataProvider";
import GetAllProducts from "./hooks/GetAllProducts";

function App() {
  const [AllProducts] = GetAllProducts();
  const [hitDb, setHitDb] = useState(0);
  const handleHit = () => {
    setHitDb(hitDb + 1);
  };

  return (
    <div>
      <DataProvider.Provider value={{ handleHit, hitDb, AllProducts }}>
        <AuthProvider>
          <Router>
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <CartDetails />
                  </PrivateRoute>
                }
              />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/support-policy" element={<SupportPolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/product/:productId"
                element={<ProductDetailOverview />}
              />
            </Routes>
            <Footer />
          </Router>
        </AuthProvider>
      </DataProvider.Provider>
    </div>
  );
}

export default App;
