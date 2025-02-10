import { NextResponse } from "next/server";
import axios from "axios";

// Define the API route to handle the product fetching
export async function POST(req: Request) {
  try {
    const { productIds } = await req.json();

    if (!productIds || !Array.isArray(productIds)) {
      return NextResponse.json({ error: "Invalid product IDs" }, { status: 400 });
    }

    // Fetch all products from the external API using the provided product IDs
    const products = await Promise.all(
      productIds.map(async (id: string) => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        return response.data;
      })
    );

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
