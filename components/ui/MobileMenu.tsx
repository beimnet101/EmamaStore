// app/components/mobile-menu.tsx (Client Component)
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  categories: { id: string; name: string }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Button (Only visible when closed) */}
      {!isOpen && (
        <button
          onClick={toggleMenu}
          className="lg:hidden ml-4 cursor-pointer z-50"
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-white w-full h-full p-6 overflow-y-auto shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Categories</h2>

          {/* Close Button (Only inside the menu) */}
          <button
            onClick={toggleMenu}
            className="cursor-pointer z-50"
            aria-label="Close menu"
          >
            <X size={32} />
          </button>
        </div>

        {/* Category Links */}
        <nav className="space-y-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="block text-lg font-bold hover:text-gray-700"
              onClick={toggleMenu} // Close on link click
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
