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
import BillboardSkeleton from "@/components/skeletons/billboardSkeleton";
import { Product } from "@/types";

export const revalidate = 0;

interface CategoryPageProps {
  params: { categoryId: string };
  searchParams: { colorId: string; sizeId: string };
}

// Helper function to add delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  // Fetch all data in parallel
  const [products, sizes, colors, category] = await Promise.all([
    getProducts({
      categoryId: params.categoryId,
      colorId: searchParams.colorId,
      sizeId: searchParams.sizeId,
    }),
    getSizes(),
    getColors(),
    getCategory(params.categoryId),
  ]);

  // Simulate delay before showing Billboard (e.g., for video billboard)
  await delay(1000); // 1-second delay

  return (
    <div className="bg-white">
      <Container>
        <div className="animated-billboard transform transition-transform duration-300 hover:scale-110">
          {/* Render Skeleton while waiting */}
          {!category?.billboard ? <BillboardSkeleton /> : <Billboard data={category.billboard} />}
        </div>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8 pt-3">
            <MobileFilter sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 ? (
                <NoResults />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {products.map((item) => (
                    <ProductCard key={item.id} data={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
