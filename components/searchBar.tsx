"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getSearchedProducts from "@/actions/get-searched-products";

interface Product {
  id: string;
  name: string;
}
interface SearchBarProps {
  isMobileSearch?: boolean; // Make the prop optional
  onProductClick?: () => void;
}


const SearchBar: React.FC<SearchBarProps> = ({ isMobileSearch = false, onProductClick }) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const router = useRouter();

  // Fetch suggestions using the provided hook
  const fetchSuggestions = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await getSearchedProducts({ searchTerm });

      // Extract required fields
      const productNames = data.map((item: any) => ({
        id: item.id,
        name: item.name,
      }));

      setSuggestions(productNames);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce effect to limit API calls
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query) fetchSuggestions(query);
    }, 300); // 300ms debounce

    return () => clearTimeout(delay);
  }, [query]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  // Navigate to the search results page
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/product/search?query=${encodeURIComponent(query)}`);
    }
  };

  // Set query and navigate to a specific product page on suggestion click
  const handleSuggestionClick = (product: Product) => {
    setQuery(product.name); // Update input value
    setSuggestions([]);     // Clear suggestions from the page
    if (onProductClick) onProductClick(); 
    router.push(`/product/${product.id}`); // Navigate to the product page
  };
  

  return (
    <form onSubmit={handleSearch} className="relative w-64">
      
      <div className="relative">
        
      {isMobileSearch ? ( // Conditionally render the mobile layout
          <div className="flex items-center">
            
            <button
              type="submit"
              className="mr-2 text-gray-500 hover:text-blue-500" // Removed absolute positioning
            >
              <Search size={20} />
            </button>
            <input
  type="text"
  name="search"
  placeholder="Search"
  value={query}
  onChange={handleInputChange}
  className="w-full bg-transparent outline-none pr-10 placeholder:text-gray-500 font-bold text-lg" // Added text-lg
/>
           
          </div>):(
     
        <Input
          type="text"
          name="search"
          placeholder="Search for products..."
          value={query}
          onChange={handleInputChange}
          className="pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />)
      }



    {/* Search Icon */}
       
        {!isMobileSearch && <button
          type="submit"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
        >
          <Search size={20} />
        </button>
}
        {/* Spinner Loader */}
        {!isMobileSearch && loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="animate-spin h-4 w-4 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
        )}

       
        {/* Autocomplete Dropdown */}
        {!isMobileSearch && suggestions.length > 0 && (
          <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50">
            {suggestions.map((product) => (
              <li
                key={product.id}
                onClick={() => handleSuggestionClick(product)}
                className="p-2 cursor-pointer hover:bg-grey-100 text-gray-800 transition duration-150 ease-in-out"
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
   
      {/* Display Suggestions on the Page for Mobile */}
      {isMobileSearch && (
          <div className="mt-4 w-full">
            {loading && (
              <div className="flex justify-center p-2 z-50">{" "}
                {/* Added z-50 */}
                <svg
                  className="animate-spin h-4 w-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              </div>
            )}
            {suggestions.length > 0 && (
              <div>
                   { <div className="p-4">
              <p className="text-lg font-semibold mb-4">Suggested Searches</p>
             
            </div> }
                {suggestions.map((product) => (
                   
                    <div
                      key={product.id}
                      onClick={() => handleSuggestionClick(product)}
                      className="p-2 cursor-pointer hover:bg-blue-100 text-gray-800 transition duration-150 ease-in-out border-b border-gray-200"
                    >
                       <span className="text-gray-500 mr-2"></span> {/* Added Q icon */}
                  
                    {product.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
    </div>
    </form>
  );
};

export default SearchBar;