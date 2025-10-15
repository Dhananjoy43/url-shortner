import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Exclude /dashboard, /api, and / (home)
        source: "/:slug((?!dashboard|auth|api)(?!^$).+)",
        destination: "/api/links/:slug/redirect",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
