import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart.tsx";
import ProductDetailPage from "./components/ProductDetails.tsx";
import Footer from "./components/shared/Footer.tsx";
import Navbar from "./components/shared/Navbar.tsx";
import "./index.css";
import RootLayout from "./layouts/RootLayout.tsx";
import ServicesLayout from "./layouts/ServicesLayout.tsx";
import ShopLayout from "./layouts/ShopLayout.tsx";
import AppointmentPage from "./pages/AppointmentPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ServicesPage from "./pages/ServicePage.tsx";
import ShopPage from "./pages/ShopPage.tsx";
import { store } from "./store/store.ts";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <Provider store={store}>
        <Theme appearance="inherit">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<RootLayout />}> // RootLayout or HomePage
                <Route index element={<HomePage />} />
              </Route>
              <Route path="/appointment" element={<AppointmentPage />} /> // AppointmentPage
              <Route path="/shop" element={<ShopLayout />}>
                <Route index element={<ShopPage />} /> // ShopPage
                <Route path=":slug" element={<ProductDetailPage />} /> // ProductDetailPage
              </Route>
              <Route path="/services" element={<ServicesLayout />}> // ServicesLayout or ServicesPage
                <Route index element={<ServicesPage />} />
              </Route>
              <Route path="/contact" element={<ContactPage />} /> // ContactPage
              <Route path="/cart" element={<Cart />} /> // Cart
            </Routes>
            <Footer />
          </BrowserRouter>
        </Theme>
      </Provider>
  </StrictMode>
);