import React, { useEffect, useState } from "react";
import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";

// Import types
import { Category, Product, Size, Color } from "@/types";

interface CategoryData {
  category: Category | null;
  products: Product[];
  sizes: Size[];
  colors: Color[];
}

const useCategoryData = (categoryId: string, searchParams: { colorId: string; sizeId: string }) => {
  const [data, setData] = useState<CategoryData>({
    category: null,
    products: [],
    sizes: [],
    colors: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts({
          categoryId,
          colorId: searchParams.colorId,
          sizeId: searchParams.sizeId,
        });

        const sizes = await getSizes();
        const colors = await getColors();
        const category = await getCategory(categoryId);

        setData({
          products,
          sizes,
          colors,
          category,
        });
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId, searchParams]);

  return { data, isLoading, error };
};

export default useCategoryData;
