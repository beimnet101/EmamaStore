import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get("searchTerm");

    if (!searchTerm) {
      return NextResponse.json(
        { error: "Missing search term" },
        { status: 400 }
      );
    }

    const queryParams = new URLSearchParams();
    queryParams.append("searchTerm", searchTerm);

    const externalUrl = `${process.env.NEXT_PUBLIC_API_URL}/products/search?${queryParams.toString()}`;
    console.log("Calling external API:", externalUrl); // ✅ Debug URL

    const response = await axios.get(externalUrl);

    console.log("API Response Data:", response.data); // ✅ Debug Response

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching searched products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
