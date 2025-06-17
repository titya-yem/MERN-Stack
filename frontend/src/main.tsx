import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { store } from "./store/store.ts";

import Cart from "./components/Cart.tsx";
import ProductDetailPage from "./components/ProductDetails.tsx";
import Footer from "./components/shared/Footer.tsx";
import Navbar from "./components/shared/Navbar.tsx";

// Layouts
import RootLayout from "./layouts/RootLayout.tsx";
import ServicesLayout from "./layouts/ServicesLayout.tsx";
import ShopLayout from "./layouts/ShopLayout.tsx";
import ShopDetailLayout from "./layouts/ShopLayoutById.tsx";

// Pages
import AppointmentPage from "./pages/AppointmentPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ServicesPage from "./pages/ServicePage.tsx";
import ShopPage from "./pages/ShopPage.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Theme appearance="inherit">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              {/* Home Page */}
              <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
              </Route>

              {/* Appointment Page */}
              <Route path="/appointment" element={<AppointmentPage />} />

              {/* Shop Pages */}
              <Route path="/shop" element={<ShopLayout />}>
                <Route index element={<ShopPage />} />
              </Route>
              <Route path="/shop/:slug" element={<ShopDetailLayout />}>
                <Route index element={<ProductDetailPage />} />
              </Route>

              {/* Services Page */}
              <Route path="/services" element={<ServicesLayout />}>
                <Route index element={<ServicesPage />} />
              </Route>

              {/* Contact Page */}
              <Route path="/contact" element={<ContactPage />} />

              {/* Contact Page */}
              <Route path="/login" element={<LoginPage />} />

              {/* Cart Page */}
              <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </QueryClientProvider>
      </Theme>
    </Provider>
  </StrictMode>
);