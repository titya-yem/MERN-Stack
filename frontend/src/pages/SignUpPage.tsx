import SignupBackground from "@/assets/image/signup-background.png";
import SignUpForm from "@/components/SignUpForm";
import { Box } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";

const SignUpPage = () => {
  return (
      <Box>
        <Toaster />
      <div className="flex justify-center items-center py-8 bg-[#1F272B]">
        {/* Image */}
        <Box>
          <img
            src={SignupBackground}
            alt="cute cat and dog sitting on a chair"
            className="hidden lg:block w-[458px]"
          />
        </Box>

        {/* Form */}
        <Box>
          <SignUpForm />
        </Box>
      </div>
    </Box>
  )
}

export default SignUpPage
