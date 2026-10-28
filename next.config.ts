import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Keep the *.vercel.app address out of search.
  //
  // It is the preview she reviews before launch, and it stays reachable
  // afterwards serving the same pages — so without this it becomes a second
  // copy of her site competing with austinwomenscounseling.com in results.
  // Matching on the host means nothing has to change at go-live: a real
  // domain is never *.vercel.app, so the rule simply stops applying.
  //
  // Deliberately host-based rather than keyed off an environment variable.
  // An env-based gate was tried once across these repos and could flip a
  // real client site to noindex if the variable was missing; it was reverted
  // for exactly that reason.
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<host>.+)\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
