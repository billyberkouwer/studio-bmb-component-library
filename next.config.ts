import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.sanity.io"],
    remotePatterns: [{
      hostname: "cdn.sanity.io",
      protocol: 'https',
      port: '',
    }]
  }
};

export default nextConfig;
