import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'grover.xgramm.com',
        pathname: '/admin/uploads/**',
      },
    ],
  },
};


export default nextConfig;
