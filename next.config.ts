import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow opening the dev server via the LAN address (e.g. from a phone).
  allowedDevOrigins: ["192.168.18.4"],
};

export default nextConfig;
