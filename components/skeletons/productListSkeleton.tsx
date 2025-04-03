const ProductListSkeleton = () => {
    return (
      <div className="space-y-4">
        {/* Title Skeleton */}
        <div className="h-8 w-1/3 bg-gray-300 animate-pulse rounded-md"></div>  
  
        {/* Grid Skeleton for Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-64 w-full bg-gray-300 animate-pulse rounded-md"
            ></div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProductListSkeleton;
  