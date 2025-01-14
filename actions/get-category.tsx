import { Category} from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`; // Use the correct env variable

const getCategory = async (id: string): Promise<Category> => { // Define as a single Billboard
  const res = await fetch(`${URL}/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch category');
  }
  return res.json();
};

export default getCategory;
