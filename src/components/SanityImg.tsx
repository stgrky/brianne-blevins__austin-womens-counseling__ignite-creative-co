import Image from "next/image";

import { urlFor } from "@/sanity/image";
import type { SanityImageWithAlt } from "@/sanity/types";

interface SanityImgProps {
  image?: SanityImageWithAlt;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /**
   * How the source is fitted to width x height. "crop" (the default) fills the
   * box exactly and trims the overflow -- right for portraits, where the frame
   * matters more than the edges. "max" scales the image down to fit inside the
   * box and never trims, which is what logos and badges need: their aspect
   * ratios vary, and any crop eats the artwork.
   */
  fit?: "crop" | "max";
}


/**
 * Pull the source pixel dimensions out of a Sanity asset id, which always
 * ends "-<width>x<height>-<ext>". Returns null for anything unparseable,
 * in which case the caller falls back to the requested box.
 */
function naturalSize(
  image?: SanityImageWithAlt
): { w: number; h: number } | null {
  const ref = (image as { asset?: { _ref?: string } } | undefined)?.asset?._ref;
  const m = ref?.match(/-(\d+)x(\d+)-[a-z]+$/i);
  return m ? { w: Number(m[1]), h: Number(m[2]) } : null;
}

export function SanityImg({
  image,
  alt,
  width,
  height,
  className,
  priority,
  sizes,
  fit = "crop",
}: SanityImgProps) {
  // Demo fallback: render a plain URL directly (no Sanity backend needed).
  if (image?.demoUrl) {
    return (
      <Image
        src={image.demoUrl}
        alt={alt ?? image.alt ?? ""}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  const builder = urlFor(image);
  if (!builder) {
    return (
      <div
        className={`flex items-center justify-center bg-[var(--color-accent-soft)] text-[var(--color-muted)] ${className ?? ""}`}
        style={{ aspectRatio: `${width}/${height}` }}
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-wide">Image</span>
      </div>
    );
  }
  // Giving the builder BOTH a width and a height makes it derive a crop
  // rectangle to force that aspect ratio, centred on the hotspot — and it
  // does so whether or not the image has a crop saved on it. Asking for
  // 320x80 from a 600x377 logo therefore returned `rect=0,114,600,150`: a
  // 4:1 band through the middle, with the top of the mark and the whole word
  // underneath it sliced off. `fit=max` does not prevent that; it only caps
  // the output size afterwards, which is why changing the fit alone looked
  // right in the URL and still arrived cropped.
  //
  // So for "max" we send a width only, and take the real proportions from
  // the asset id, which ends in the source dimensions.
  const natural = naturalSize(image);
  const useMax = fit === "max";
  const outHeight =
    useMax && natural ? Math.round((width * natural.h) / natural.w) : height;
  const src = useMax
    ? builder.width(width).fit("max").auto("format").url()
    : builder.width(width).height(height).fit(fit).auto("format").url();
  return (
    <Image
      src={src}
      alt={alt ?? image?.alt ?? ""}
      width={width}
      height={outHeight}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
