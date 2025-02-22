import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import MobileFilter from "./components/mobile-filters";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  // Fetch data asynchronously
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });

  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  return (
    <div className="bg-white">
      <Container>
        <div className="animated-billboard transform transition-transform duration-300 hover:scale-110">
        <Billboard data={category.billboard} />
        </div>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/* Mobile filters */}
            <MobileFilter sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              {/* Desktop filters */}
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>

            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {/* Display products */}
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
