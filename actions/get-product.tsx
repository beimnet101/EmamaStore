import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`; // Use the correct env variable

const getProduct = async (id: string): Promise<Product> => { // Define as a single Billboard
  const res = await fetch(`${URL}/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
};

export default getProduct;
