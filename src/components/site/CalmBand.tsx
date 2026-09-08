"use client";

import { Float } from "@/components/motion/Float";
import { Reveal } from "@/components/motion/Reveal";

/**
 * HAVEN structural signature — the calm band. A full-bleed wash of drifting
 * lavender light holding a single whispered line. No CTA, no cards, no ask.
 * Its entire job is to be the quietest moment on the page — negative space
 * as a design feature.
 */
export function CalmBand() {
  return (
    <section
      className="relative overflow-hidden py-32 md:py-44"
      style={{
        background:
          "linear-gradient(165deg, var(--color-accent-soft) 0%, var(--color-background) 55%, var(--color-surface) 100%)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Float duration={16} distance={14}>
          <div
            className="absolute left-[12%] top-[15%] h-[300px] w-[300px] rounded-full opacity-25 blur-3xl"
            style={{ background: "var(--color-accent)" }}
          />
        </Float>
        <Float duration={20} distance={10}>
          <div
            className="absolute bottom-[8%] right-[10%] h-[340px] w-[340px] rounded-full opacity-30 blur-3xl"
            style={{ background: "#b9c6e4" }}
          />
        </Float>
      </div>

      <Reveal distance={14} duration={1.3}>
        <p className="relative mx-auto max-w-2xl px-6 text-center font-serif text-3xl italic leading-[1.4] text-[var(--color-foreground)]/85 md:text-[2.6rem]">
          Nothing here needs to be forced. Not even this.
        </p>
      </Reveal>
    </section>
  );
}
