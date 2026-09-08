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
}

export function SanityImg({
  image,
  alt,
  width,
  height,
  className,
  priority,
  sizes,
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
  const src = builder.width(width).height(height).fit("crop").auto("format").url();
  return (
    <Image
      src={src}
      alt={alt ?? image?.alt ?? ""}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
