import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.frescocerca.es" }],
        destination: "https://frescocerca.es/:path*",
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "frescocerca.vercel.app" }],
        destination: "https://frescocerca.es/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
