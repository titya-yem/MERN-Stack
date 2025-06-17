import { Box, Text } from "@radix-ui/themes";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEnvelope, FaUser, FaUserLock } from "react-icons/fa";
import { Button } from "./ui/button";

const LoginForm = () => {
    const { register, handleSubmit, reset } = useForm();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: any) => {
        try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/user/create`, {...data});
        console.log({...data});
        toast.success("Account created successfully!", {
            position: "top-center",
        });
        reset(); // reset form as new afte subbmited
        } catch (error) {
        console.log(error);
        toast.error("Error to create an account please contact us");
        }
  };

  return (
    <div className="w-[340px] md:w-[450px] h-[590px] py-6 shadow-lg rounded-lg lg:rounded-l-none max-w-md bg-white">
      <h2 className="text-2xl font-bold text-center">
        Welcome to Pet Shop
      </h2>
      <Text as="p" className="text-sm pt-4 pb-6 text-center text-[#A8A5A6]">
        For better Experience with your pets!
      </Text>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="space-y-2 mx-auto text-end">
          <Box className="space-y-4">
                <Box className="relative">
                <FaUser className="absolute left-3 top-[18px] text-gray-400" />
                <input
                {...register("userName")}
                type="text"
                placeholder="User Name"
                className="w-[300px] md:w-[350px] pl-10 md:pl-10 p-4 md:p-3 text-sm md:text-base border rounded-lg"
                required
                />
            </Box>

            <Box className="relative">
                <FaEnvelope className="absolute left-3 top-[18px] text-gray-400" />
                <input
                {...register("email")}
                type="email"
                placeholder="Email address"
                className="w-full pl-10 md:pl-10 p-4 md:p-3 text-sm md:text-base border rounded-lg"
                required
                />
            </Box>

            <Box className="relative">
                <FaUserLock className="absolute left-3 top-[18px] text-gray-400" />
                <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full pl-10 md:pl-10 p-4 md:p-3 text-sm md:text-base border rounded-lg"
                required
                />
            </Box>
          </Box>
          <a href="" className="text-sm font-medium hover:font-semibold underline text-blue-600">
            Forget Password?
          </a>

          <Button
          type="submit"
          className="text-base p-6 mt-6 rounded-lg w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
