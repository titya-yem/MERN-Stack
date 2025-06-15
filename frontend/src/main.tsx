import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Theme appearance="inherit">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
              </Route>
              <Route path="/appointment" element={<AppointmentPage />} />
              <Route path="/shop" element={<ShopLayout />}>
                <Route index element={<ShopPage />} />
                <Route path=":slug" element={<ProductDetailPage />} />
              </Route>
              <Route path="/services" element={<ServicesLayout />}>
                <Route index element={<ServicesPage />} />
              </Route>
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </QueryClientProvider>
      </Theme>
    </Provider>
  </StrictMode>
);