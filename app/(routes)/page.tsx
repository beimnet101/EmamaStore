import getBillboard from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import ProductList from "@/components/products-list";

export const revalidate = 0; // Ensure revalidation if necessary

const Homepage: React.FC = async () => { // Add React.FC type
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("cm6g7t6ix0002cy4k29bigf3p");
  const billboard2 = await getBillboard("cm6g7u1b20004cy4kr010z788");

  return (
    <Container>
      <div className="space-y-8 pb-10">
        <div className="animated-billboard transform transition-transform duration-300 hover:scale-110">
          <Billboard data={billboard} />
        </div>
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
        <div className="animated-billboard transform transition-transform duration-300 hover:scale-110">
         <Billboard data={billboard2} />
        </div>
      </div>
    </Container>
  );
};

export default Homepage;
