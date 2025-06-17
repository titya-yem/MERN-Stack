import LoginBackground from "@/assets/image/Login-Background.png";
import LoginForm from "@/components/LoginForm";
import { Box } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";

const LoginPage = () => {
  return (
      <Box className=" bg-[#e3462c]">
        <Toaster />
        <div className="flex py-8 justify-center items-center bg-[#FFEFF4]">
            {/* Image */}
            <Box>
                <img
                    src={LoginBackground}
                    alt="cute cat and dog sitting on a chair"
                    className="hidden lg:block w-[433px] mx-auto md:mx-0"
                    />
            </Box>

            {/* Form */}
            <Box>
                <LoginForm />
            </Box>
        </div>
    </Box>
  )
}

export default LoginPage
