import logo from "@/assets/image/Logo.png";
import addressIcon from "@/assets/svg/Address.svg";
import emailIcon from "@/assets/svg/Email.svg";
import phoneIcon from "@/assets/svg/footer-phone.svg";
import line from "@/assets/svg/Line.svg";
import { NavbarLists } from "@/constants/Navbar";
import { Box, Container, Text } from "@radix-ui/themes";
import { Link } from "react-router";
import { Button } from "../ui/button";

const Footer: React.FC = () => {
  return (
    <Container className="pt-10 px-4 pb-6 *:text-white bg-[#253239]">
      <div className="flex flex-col md:flex-row justify-center xl:justify-between items-center flex-wrap gap-x-20  gap-y-4">
        {/* left side */}
        <Box>
          <img
            src={logo}
            alt="Pet Shop Logo"
            width="100px"
            className="mx-auto md:mx-0"
          />
          <Text
            as="p"
            className="w-2/3 text-sm md:text-base md:pl-3 text-center mx-auto md:mx-0 md:text-start text-white"
          >
            Sign up to our newsletter to receive 5% off your first order!
          </Text>
          <div className="flex justify-center items-center md:justify-start xl:pl-3 my-6">
            <input
              type="email"
              name="Email Address"
              placeholder="Your Email Address"
              className="md:w-[250px] text-sm md:text-base px-4 py-[14px] md:py-3 rounded-l-lg focus:outline-none"
            />
            <Button
              type="submit"
              className="py-6 rounded-r-lg rounded-l-none bg-[#E3462C] hover:bg-[#c23e26]"
            >
              Sign Up
            </Button>
          </div>
        </Box>

        {/* Middle side */}
        <Box className="text-center">
          <h1 className="mb-3 text-xl md:text-2xl lg:text-3xl font-semibold">
            Menu
          </h1>
          <Box>
            {NavbarLists.map((list) => (
              <ul key={list.link}>
                <li className="underline underline-offset-4 pb-3 hover:font-medium duration-200">
                  <Link to={list.link}>{list.label}</Link>
                </li>
              </ul>
            ))}
          </Box>
        </Box>

        {/* Right side */}
        <Box className="text-center">
          <h1 className="mb-3 text-xl md:text-2xl lg:text-3xl font-semibold">
            Contact Us
          </h1>
          <Box className="xl:mt-14 space-y-2">
            <div className="flex items-center justify-center gap-x-4">
              <img src={addressIcon} alt="Our Locatio" />
              <Text as="p" className="w-[62%] md:w-1/2 text-left">
                9400 S Normandie Ave #14 Los Angeles(CA), 90044
              </Text>
            </div>
            <div className="flex items-center justify-center gap-x-4">
              <img src={emailIcon} alt="Contact us via our Email" />
              <Text as="p">
                <a href="mailto:thitya.yem.photo@gmail.com">
                  thitya.yem.photo@gmail.com
                </a>
              </Text>
            </div>
            <div className="flex items-center justify-center gap-x-4">
              <img src={phoneIcon} alt="Our phone number" />
              <Text as="p">(323) 238-0696</Text>
            </div>
          </Box>
        </Box>
      </div>
      <img src={line} alt="footer-line" className="mt-8 mb-6" />
      <Text as="p" className="text-sm text-center md:text-start md:pl-3">
        Copyright by Pet Shop. (Titya Yem)
      </Text>
    </Container>
  );
};

export default Footer;