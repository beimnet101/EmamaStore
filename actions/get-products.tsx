import { Product } from "@/types";
import qs from"query-string";
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`; // Use the correct env variable
interface Query{
    categoryId?:string,
    colorId?:string,
    sizeId?:string,
    isFeatured?:boolean;
}
const getProducts = async (query:Query): Promise<Product[]> => { // Define as an array of Category

  
  
  const url=qs.stringifyUrl({
url:URL,
query:{
    colorId:query.colorId,
    sizeId:query.sizeId,
    categoryId:query.categoryId,
    isFeatured:query.isFeatured
}

  })
    const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
};

export default getProducts;
