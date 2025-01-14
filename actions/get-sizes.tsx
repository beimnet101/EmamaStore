import { Size } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`; // Use the correct env variable

const getSizes = async (): Promise<Size[]> => { // Define as an array of Category
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error('Failed to fetch sizes');
  }
  return res.json();
};

export default getSizes;
