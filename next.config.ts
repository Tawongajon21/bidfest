import type { NextConfig } from "next";

const nextConfig = {  // 👈 remove ": NextConfig" type annotation
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: 'api.bidfirstauctions.co.zw',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'api.bidfirstauctions.co.zw',
        pathname: '/**'
      },
    ]
  }
} 

export default nextConfig;