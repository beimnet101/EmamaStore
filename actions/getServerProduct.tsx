// actions/get-products.ts

import { Product } from "@/types"; // Import the Product type

const getProducts = async (ids: string[]): Promise<Product[]> => {
  const response = await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify({ productIds: ids }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json(); // Assuming response is an array of Product
};

export default getProducts;
