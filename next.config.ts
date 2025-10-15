import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Exclude both /dashboard and /api from redirection
        source: "/:slug((?!dashboard|api).*)",
        destination: "/api/links/:slug/redirect",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
