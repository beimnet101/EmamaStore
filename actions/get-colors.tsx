import { Color } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`; // Use the correct env variable

const getColors = async (): Promise<Color[]> => { // Define as an array of Category
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error('Failed to fetch colors');
  }
  return res.json();
};

export default getColors;
