import getSearchedProducts from "@/actions/get-searched-products";
import getBillboard from "@/actions/get-billboards";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import ProductList from "@/components/products-list";
import { redirect } from "next/navigation";
import getSearchedProduct from  "@/actions/get-searched-products"


export const revalidate = 0;

interface SearchPageProps {
  searchParams: {
    query?: string;
  };
}

const SearchPage: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const searchTerm = searchParams.query || "";

  // Redirect to home if no search term
  if (!searchTerm.trim()) {
    redirect("/");
  }

  // Fetch products using the search hook
  const products = await getSearchedProducts({ searchTerm });
  

  return (
    <Container>
      <div className="space-y-8 pb-10">
     

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">
            Search Results for: "{searchTerm}"
          </h1>

          {products.length > 0 ? (
            <ProductList title="Products" items={products} />
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default SearchPage;
