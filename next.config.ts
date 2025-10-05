import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol:'http',
        hostname:'localhost',
        port:'4000',
        pathname:'/**'
      },
      
      {
        protocol:'http',
        hostname:'api.bidfirstauctions.co.zw',
      
        pathname:'/**'
      },
      
      {
        protocol:'https',
        hostname:'api.bidfirstauctions.co.zw',
        pathname:'/**'
      },

    ]
  },
eslint:{
  ignoreDuringBuilds:true
}
};

export default nextConfig;
