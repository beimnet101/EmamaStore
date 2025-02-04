import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarAction from "./navbar-action";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const revalidate=0;
const Navbar = async () => {

  const categories = await getCategories();

  if (!Array.isArray(categories)) {
    throw new Error("Expected categories to be an array.");
  }
  return (
    <div className="border-b">
      <Container>
        <div className="relative  sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">EMAMA-STORE</p>
          </Link>
          <MainNav data={categories} />
          <NavbarAction/>
          <div className="text-lg mt-2 ml-2 pr-0">
          <UserButton afterSignOutUrl="/" />
          </div> 
          
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
