"use client";

import Marquee from "react-fast-marquee";

/**
 * HAVEN — modalities drifting past like slow water. Same marquee mechanics
 * as Bloom's ticker but tuned way down: half the speed, lightweight serif,
 * soft diamond separators. Ambience, not announcement.
 * List editable in Studio (homePage.modalities).
 */
export function ModalityDrift({ modalities }: { modalities: string[] }) {
  if (modalities.length === 0) return null;

  return (
    <section
      aria-label="Modalities"
      className="border-y border-[var(--color-subtle)]/60 bg-[var(--color-background)] py-5"
    >
      <Marquee autoFill pauseOnHover speed={22} gradient={false}>
        {modalities.map((modality) => (
          <span key={modality} className="flex items-center">
            {/* leading-normal, not leading-none: a line box exactly the font
                size tall pushes descenders (g, p, y) outside it, and the
                marquee's overflow:hidden then shears them off. */}
            <span className="font-serif text-xl leading-normal text-[var(--color-foreground)]/70 md:text-2xl">
              {modality}
            </span>
            <span
              aria-hidden
              className="mx-10 text-xs text-[var(--color-accent)]/80"
            >
              ✧
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
