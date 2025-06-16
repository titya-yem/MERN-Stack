import OurBrands from "@/components/OurBrands";
import { Outlet } from "react-router-dom";

const ShopDetailLayout = () => {
  return (
    <>
      <Outlet />
      <OurBrands />
    </>
  );
};

export default ShopDetailLayout;