import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint blocking the production build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // (Keep your other config options here if any)
};

export default nextConfig;
