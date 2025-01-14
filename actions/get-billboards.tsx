import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`; // Use the correct env variable

const getBillboard = async (id: string): Promise<Billboard> => { // Define as a single Billboard
  const res = await fetch(`${URL}/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch billboard');
  }
  return res.json();
};

export default getBillboard;
