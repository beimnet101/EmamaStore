// components/Skeleton.tsx
const Skeleton = ({ width, height, className }: { width?: string; height?: string; className?: string }) => {
    return (
      <div
        className={`bg-gray-300 animate-pulse rounded-md ${className}`}
        style={{ width: width || "100%", height: height || "20px" }}
      />
    );
  };
  
  export default Skeleton;
  