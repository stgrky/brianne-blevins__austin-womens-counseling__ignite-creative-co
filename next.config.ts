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
  // Her Google Sites addresses, kept alive as permanent redirects.
  //
  // The old site answers on /home, /services-offered, /forms-fees and
  // /website-privacy-policy. Those are what her printed cards, her directory
  // listings and anyone's bookmarks point at, and all four 404 on this build.
  // A 301 passes the link equity on rather than dropping it, which matters
  // because she told us her site "is not ranking well at all" and losing the
  // links she does have would make that worse, not better.
  //
  // /forms-fees goes to About rather than /forms: /forms here is the
  // onboarding paperwork she sends privately, while her old Forms & Fees page
  // carried the fees and the Good Faith Estimate notice, which now live in
  // the Rates & GFE section on About.
  //
  // /consultation, /contact and /supervision kept their addresses, so they
  // need nothing.
  async redirects() {
    return [
      // Apex to www.
      //
      // www is the canonical host and has been since before this build: the
      // apex already 302s there on her Google Sites setup, so www is what is
      // linked to and what search engines hold. Both hostnames are attached
      // to the Vercel project, so without this they would serve the same
      // pages at two addresses and split her ranking.
      //
      // The host pattern is anchored so it cannot also match
      // www.austinwomenscounseling.com. If it did, www would redirect to
      // itself forever and the site would be down.
      {
        source: "/:path*",
        has: [{ type: "host", value: "^austinwomenscounseling\\.com$" }],
        destination: "https://www.austinwomenscounseling.com/:path*",
        permanent: true,
      },
      { source: "/home", destination: "/", permanent: true },
      { source: "/services-offered", destination: "/services", permanent: true },
      { source: "/forms-fees", destination: "/about#rates", permanent: true },
      { source: "/website-privacy-policy", destination: "/privacy", permanent: true },
    ];
  },

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
