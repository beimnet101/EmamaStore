import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`; // Use the correct env variable

const getCategories = async (): Promise<Category[]> => { // Define as an array of Category
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
};

export default getCategories;
