const ProductCardSkeleton = () => {
    return (
      <div className="bg-white animate-pulse rounded-xl border p-3 space-y-4">
        {/* Image Skeleton */}
        <div className="aspect-square bg-gray-200 rounded-xl"></div>
  
        {/* Title Skeleton */}
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
  
        {/* Category Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  
        {/* Price Skeleton */}
        <div className="h-5 bg-gray-300 rounded w-1/3"></div>
      </div>
    );
  };
  
  export default ProductCardSkeleton;
  