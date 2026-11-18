import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "10.10.1.104",
    "10.10.1.*",
    "localhost",
    "127.0.0.1",
  ],
};

export default nextConfig;
