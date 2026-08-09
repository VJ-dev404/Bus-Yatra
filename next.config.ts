import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // We only need the images configuration for Vercel
  images: {
    qualities: [75, 100],
  },
};

export default nextConfig;