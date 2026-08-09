import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keeps the dev logo hidden
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
  // Tells Next.js that 100% quality is allowed
  images: {
    qualities: [75, 100],
  },
};

export default nextConfig;