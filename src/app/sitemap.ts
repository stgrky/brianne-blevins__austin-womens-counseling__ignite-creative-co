import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * The pages she wants found.
 *
 * Deliberately a hand-kept list rather than a crawl of the route tree, because
 * two routes must stay out of it:
 *
 *   /forms   onboarding paperwork she sends by link after a consultation. It
 *            carries robots index:false for the reason written on that page,
 *            and listing it here would contradict that.
 *   /blog    hidden from the menu and the footer, with nothing published in
 *            it. Submitting an empty section invites Google to judge the site
 *            on thin pages.
 *
 * /studio is excluded by robots.ts as well.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/services",
    "/supervision",
    "/consultation",
    "/faq",
    "/notices",
    "/contact",
    "/privacy",
  ];

  const lastModified = new Date();

  return routes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));
}
