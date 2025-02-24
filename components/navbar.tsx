import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarAction from "./navbar-action";
import { UserButton } from "@clerk/nextjs";
import MobileMenu from "./ui/MobileMenu";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  if (!Array.isArray(categories)) {
    throw new Error("Expected categories to be an array.");
  }

  return (
    <div className="border-b">
      <Container>
        <div className="relative sm:px-6 lg:px-8 flex h-16 items-center">
          {/* Mobile Hamburger Menu */}
          <MobileMenu categories={categories} />

        {/* Logo (Centered on Mobile Only) */}
<Link
  href="/"
  className="ml-11 flex gap-x-2 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 lg:static lg:translate-x-0"
>
  <p className="font-bold text-xl">EMAMA-STORE</p>
</Link>


          {/* Main Navigation (Desktop Only) */}
          <div className="hidden lg:flex">
            <MainNav data={categories} />
          </div>

          {/* Navbar Actions */}
          <div className="ml-auto flex items-center">
            <NavbarAction />
            <div className="text-lg mt-2 ml-2 pr-4 sm:pr-0">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
