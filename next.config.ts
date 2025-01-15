const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Allow Cloudinary domain
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
};

export default nextConfig;
