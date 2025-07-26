import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export', // enables static HTML export mode
  distDir: '.next', // optional (default)
  trailingSlash: true, // optional: makes URLs end in `/` (e.g., /about/index.html)
  
  /* config options here */
};

export default nextConfig;