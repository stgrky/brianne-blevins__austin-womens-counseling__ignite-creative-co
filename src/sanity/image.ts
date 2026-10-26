import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, isSanityConfigured, projectId } from "./env";

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

/**
 * True when the source can actually produce a URL.
 *
 * Clearing an image in Studio does not remove the field — it removes the
 * asset reference and leaves the rest of the object behind, alt text and
 * all. So a deleted photo arrives here as a perfectly truthy
 * `{_type: "image", alt: "..."}` with nothing to point at, and the URL
 * builder throws "Unable to resolve image URL from source" when asked for a
 * URL. Because pages render per request, that throw is a 500 on the live
 * site rather than a broken image: the client deletes a photo, publishes,
 * and the page goes down.
 *
 * Checking for the asset here rather than in one component fixes it for
 * every image slot on the site at once.
 */
function hasAsset(source: SanityImageSource): boolean {
  if (typeof source === "string") return source.length > 0;
  if (typeof source !== "object" || source === null) return false;
  const s = source as Record<string, unknown>;
  // An asset document, a bare reference, or a field holding either.
  if (typeof s._id === "string" || typeof s._ref === "string") return true;
  const asset = s.asset as Record<string, unknown> | undefined;
  if (!asset) return false;
  return typeof asset._ref === "string" || typeof asset._id === "string";
}

export function urlFor(source: SanityImageSource | null | undefined) {
  if (!source || !builder) return null;
  if (!hasAsset(source)) return null;
  return builder.image(source);
}
