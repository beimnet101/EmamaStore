// components/skeletons/HomeSkeleton.tsx

const HomeSkeleton = () => {
    return (
      <div className="mt-4 mx-9 space-y-8 pb-10">
        {/* Skeleton for the First Billboard */}
        <div className="bg-gray-300 animate-pulse h-64 rounded-md w-full"></div>
  
        {/* Skeleton for the Product List */}
        <div className="space-y-4">
          <div className="font-bold text-3xl bg-gray-300 animate-pulse h-8 rounded-md w-1/2"></div> {/* Title Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Skeletons for Product Cards */}
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-300 animate-pulse h-64 rounded-md w-full"></div>
            ))}
          </div>
        </div>
  
        {/* Skeleton for the Second Billboard */}
        <div className="bg-gray-300 animate-pulse h-64 rounded-md w-full"></div>
      </div>
    );
  };
  
  export default HomeSkeleton;
  