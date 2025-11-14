import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  experimental: {
    turbopackFileSystemCacheForDev: false, // 🚫 Turn OFF turbopack cache
  },
};

export default nextConfig;
