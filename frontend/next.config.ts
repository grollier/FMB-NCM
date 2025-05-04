import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    localPatterns:[
      {
        pathname: '/assets/**',
        search: '',
      }
    ]
  },
  experimental: {
    externalDir: true,
    optimizePackageImports: ["@chakra-ui/react"]
  }
};

export default nextConfig;
