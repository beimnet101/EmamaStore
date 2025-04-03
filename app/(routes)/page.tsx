import getBillboard from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import ProductList from "@/components/products-list";
import BillboardSkeleton from "@/components/skeletons/billboardSkeleton"; // Billboard Skeleton
import ProductListSkeleton from "@/components/skeletons/productListSkeleton"; // Product List Skeleton

export const revalidate = 0; // Ensure revalidation if necessary

const Homepage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("cm6gg3alt0003cy2s0bfauihx");
  const billboard2 = await getBillboard("cm6gg3alt0003cy2s0bfauihx");

  return (
    <Container>
      <div className="space-y-8 pb-10">
        {/* Billboard Skeleton */}
        {!billboard ? <BillboardSkeleton /> : (
          <div className="transform transition-transform duration-300 hover:scale-110">
            <Billboard data={billboard} />
          </div>
        )}

        {/* Product List Skeleton */}
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          {!products.length ? (
            <ProductListSkeleton />
          ) : (
            <ProductList title="Featured Products" items={products} />
          )}
        </div>

        {/* Second Billboard Skeleton */}
        {!billboard2 ? <BillboardSkeleton /> : (
          <div className="transform transition-transform duration-300 hover:scale-110">
            <Billboard data={billboard2} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Homepage;
