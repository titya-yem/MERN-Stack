import logo from "@/assets/image/Logo.png";
import ShoppingBag from "@/assets/svg/ShoppingBag.svg";
import toggle from "@/assets/svg/Toggle.svg";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import type { RootState } from "@/store/store";
import { Box, Container, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { NavbarLists } from "../../constants/Navbar";

const Navbar = () => {
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  
  const closeSheet = () => setIsSheetOpen(false);
  const desktopNavbarLists = NavbarLists.filter((item) => item.label !== "Cart");

  // Get the current location
  const location = useLocation();

  return (
    <>
      <Container className="bg-[#e3462c]">
        <Flex justify="between" align="center" className="py-4 px-4">
          <Box>
            <Link to="/">
              <img src={logo} alt="Pet Shop logo" width={80} height={80} />
            </Link>
          </Box>
          <Flex gap="5">
            {/* Desktop Navbar */}
            {desktopNavbarLists.map((list) => (
              <ul key={list.link}>
                <li
                  className={`hidden md:flex text-white hover:font-medium duration-200 ${
                    location.pathname === list.link
                      ? "underline underline-offset-4 font-medium"
                      : ""
                  }`}
                >
                  <Link to={list.link}>{list.label}</Link>
                </li>
              </ul>
            ))}
            <Link to="/cart" className="relative">
              <img
                src={ShoppingBag}
                alt="Shopping Bag"
                width={25}
                className="hidden md:block invert"
              />
              {totalQuantity > 0 && (
                <span className="absolute bottom-2 left-3 bg-yellow-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* Mobile Navbar */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger>
                <img
                  src={toggle}
                  alt="toggle"
                  width={25}
                  className="md:hidden invert focus:outline-none"
                />
              </SheetTrigger>
              <SheetContent className="w-1/2">
                <SheetHeader>
                  <SheetTitle className="text-[#e3462c] pb-10 pt-6 text-center">
                    Pet Shop
                  </SheetTitle>
                  <Box className="text-center space-y-2">
                    {NavbarLists.map((list) => (
                      <ul key={list.link}>
                        <li
                          className={`hover:font-medium duration-200 hover:bg-[#e3462c] rounded-lg p-2 hover:text-white ${
                            location.pathname === list.link
                              ? "underline underline-offset-4 font-medium"
                              : ""
                          }`}
                          onClick={closeSheet}
                        >
                          <Link to={list.link}>{list.label}</Link>
                        </li>
                      </ul>
                    ))}
                  </Box>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Navbar;