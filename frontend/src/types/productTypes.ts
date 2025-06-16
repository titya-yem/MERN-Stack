export type Product = {
  _id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  description?: string;
};