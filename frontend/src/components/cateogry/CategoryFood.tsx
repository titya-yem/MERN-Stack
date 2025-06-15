import star from "@/assets/svg/Star.svg";
import { addToCart } from "@/store/slices/Cart-Slice";
import type { AppDispatch } from "@/store/store";
import type { Product } from "@/types/productTypes";
import { Box, Flex } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

type categoryProps = {
  startIndex: number;
  itemsToShow: number;
};

const CategoryFood = ({ startIndex, itemsToShow }: categoryProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, isError, data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`${process.env.REACT_APP_HOST_URL}/api/product`);
      return res.data;
    },
  })

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error: {(error as Error).message}</h1>;
  if (!data) return <h1>No Products Available</h1>;

  return (
    <div className="flex justify-between items-center overflow-hidden gap-x-4 xl:gap-x-0 w-[85%]">
      {data.slice(startIndex, startIndex + itemsToShow).map((item) => (
        <div key={item.id} className="w-[220px]">
          <div>
            {/* Image Box */}
            <Box className="h-[140px] rounded-t-md flex items-center justify-center bg-white">
              <img
                src={item.image}
                alt="Pet food product"
                className="mx-auto max-w-full max-h-full object-contain"
              />
            </Box>
            {/* Info Box */}
            <Box className="rounded-b-md p-4 text-white bg-[#253239]">
              <h4 className="text-base font-medium mb-2">{item.name}</h4>
              <Flex justify="between" align="center" className="mb-3">
                <p className="font-semibold">${item.price}</p>
                <Flex gapX="2" align="center">
                  <img src={star} alt={`Rating ${item.rating}`} />
                  <span>{item.rating}</span>
                </Flex>
              </Flex>
              <Button
                className="!text-black bg-[#FAD046] hover:bg-[#ffca1e] w-full py-2"
                onClick={() =>
                  dispatch(
                    addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: 1,
                        category: item.category,
                    })
                  )
                }
              >
                Add To Cart
              </Button>
            </Box>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryFood;