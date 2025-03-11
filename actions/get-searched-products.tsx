import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products/search`;

interface SearchQuery {
  searchTerm?: string;
}

const getSearchedProducts = async (query: SearchQuery): Promise<Product[]> => {
  try {
    // Ensure environment variable is correct
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const url = qs.stringifyUrl({
      url: URL,
      query: {
        searchTerm: query.searchTerm || "",
      },
    });

    console.log("Request URL:", url); // ✅ Confirm the full request URL

    const res = await fetch(url);

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("API Error Response:", errorBody);
      throw new Error(`Failed to fetch searched products: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error in getSearchedProducts:", error);
    throw error; // Ensure errors bubble up for easier debugging
  }
};

export default getSearchedProducts;
