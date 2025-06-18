import logo from "@/assets/image/Logo.png";
import ShoppingBag from "@/assets/svg/ShoppingBag.svg";
import toggle from "@/assets/svg/Toggle.svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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

const Navbar: React.FC = () => {
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const closeSheet = () => setIsSheetOpen(false);

  const location = useLocation();
  const desktopNavbarLists = NavbarLists.filter((item) => item.label !== "Cart");

  // Split into main nav and dropdown nav
  const mainNavItems = desktopNavbarLists.slice(0, 3); // Home, Shop, Services
  const dropdownItems = desktopNavbarLists.slice(3); // Appointment, Contact, Sign Up

  return (
    <Container className="bg-[#e3462c]">
      <Flex justify="between" align="center" className="py-4 px-4">
        <Box>
          <Link to="/">
            <img src={logo} alt="Pet Shop logo" width={80} height={80} />
          </Link>
        </Box>

        <Flex gap="5" align="center">
          {mainNavItems.map((item) => (
            <Link
              key={item.link}
              to={item.link}
              className={`hidden md:block text-white hover:font-medium duration-200 ${
                location.pathname === item.link
                  ? "underline underline-offset-4 font-medium"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Dropdown Menu (Appointment, Contact, Sign Up) */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="cursor-pointer text-[15px] text-white bg-[#e3462c]">
                  More
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[240px] gap-2 p-4 shadow-md rounded-md">
                    {dropdownItems.map((item) => (
                      <li key={item.link}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.link}
                            className="block p-2 rounded-md"
                          >
                            <div className="font-medium">{item.label}</div>
                            {item.description && (
                              <div className="text-sm text-muted-foreground">
                                {item.description}
                              </div>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Cart Icon */}
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

          {/* Mobile Toggle */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger>
              <img
                src={toggle}
                alt="toggle"
                width={25}
                className="md:hidden invert focus:outline-none"
              />
            </SheetTrigger>
            <SheetContent className="w-3/4 sm:w-1/2">
              <SheetHeader>
                <SheetTitle className="text-[#e3462c] pb-10 pt-6 text-center">
                  Pet Shop
                </SheetTitle>
                <Box className="text-center space-y-4">
                  {NavbarLists.map((item) => (
                    <div
                      key={item.link}
                      className={`hover:font-medium duration-200 hover:bg-[#e3462c] rounded-lg p-2 hover:text-white ${
                        location.pathname === item.link
                          ? "underline underline-offset-4 font-medium"
                          : ""
                      }`}
                      onClick={closeSheet}
                    >
                      <Link to={item.link}>{item.label}</Link>
                    </div>
                  ))}
                </Box>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;