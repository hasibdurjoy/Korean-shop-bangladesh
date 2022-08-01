import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login/Login";
import Register from "./Components/Login/Register/Register";
import PrivacyPolicy from "./Components/PolicyPages/PrivacyPolicy";
import ReturnPolicy from "./Components/PolicyPages/ReturnPolicy";
import SupportPolicy from "./Components/PolicyPages/SupportPolicy";
import TermsAndConditions from "./Components/PolicyPages/TermsAndConditions";
import ProductDetailOverview from "./Components/ProductDetail/ProductDetailOverview";
import Footer from "./Components/Shared/Footer/Footer";
import Header from "./Components/Shared/Header/Header";
import AuthProvider from "./context/AuthProvider";
import { DataProvider } from "./context/DataProvider";

function App() {
  const [hitDb, setHitDb] = useState(0);
  const handleHit = () => {
    setHitDb(hitDb + 1);
  };

  return (
    <div>
      <DataProvider.Provider value={{ handleHit, hitDb }}>
        <AuthProvider>
          <Router>
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
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
