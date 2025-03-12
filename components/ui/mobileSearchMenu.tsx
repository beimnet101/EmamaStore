"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import SearchBar from "@/components/searchBar";

export default function MobileSearchMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative">
      {!isOpen && (
        <button
          onClick={toggleMenu}
          className="lg:hidden ml-4 cursor-pointer z-50 focus:outline-none flex items-center"
          aria-label="Open menu"
        >
          <Search size={20} />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <button
            onClick={toggleMenu}
            className="absolute top-2 right-4 cursor-pointer z-50 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="w-full mt-10 relative">
            <div className="ml-8 border-b border-gray-200">
              <SearchBar isMobileSearch={true} onProductClick={closeMenu} />
            </div>

           
          </div>
        </div>
      )}
    </div>
  );
}