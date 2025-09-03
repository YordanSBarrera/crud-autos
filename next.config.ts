import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  // Configuración para PWA
  compiler: {
    // removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;