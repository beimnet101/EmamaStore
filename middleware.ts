import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function middleware(req: Request) {
  const { userId } = await auth(); // Verifies if the user is signed in

  // If there's no userId (i.e., not authenticated), redirect to sign-in page
  if (!userId) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Otherwise, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/checkout'], // Only protect the API route '/api/checkout'
};
