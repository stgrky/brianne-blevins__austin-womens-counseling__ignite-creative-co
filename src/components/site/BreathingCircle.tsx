"use client";

import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useRef, useState } from "react";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";

gsap.registerPlugin(useGSAP);

/**
 * HAVEN signature pizzazz — an actual guided breath, mid-scroll. A soft
 * lavender circle swells (4s in), holds (2s), and releases (6s out) on a
 * GSAP timeline, with the prompt text following each phase. A somatic
 * therapy site that regulates your nervous system before you've even
 * reached the contact page.
 *
 * Reduced-motion: a still circle and a standing invitation, no animation.
 */

const PHASES = {
  inhale: "breathe in…",
  hold: "hold, gently",
  exhale: "and let it all the way out",
};

export function BreathingCircle() {
  const scope = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<keyof typeof PHASES>("inhale");

  useGSAP(
    () => {
      if (reduceMotion) return;
      const tl = gsap.timeline({ repeat: -1, delay: 0.6 });
      tl.call(() => setPhase("inhale"))
        .to(".breath-circle", { scale: 1.32, duration: 4, ease: "sine.inOut" })
        .call(() => setPhase("hold"))
        .to(".breath-circle", { scale: 1.32, duration: 2 })
        .call(() => setPhase("exhale"))
        .to(".breath-circle", { scale: 1, duration: 6, ease: "sine.inOut" })
        .to(".breath-circle", { scale: 1, duration: 1.4 });
    },
    { scope, dependencies: [reduceMotion] }
  );

  return (
    <section className="overflow-hidden bg-[var(--color-surface)] py-24 md:py-32">
      <Container>
        <div ref={scope} className="flex flex-col items-center text-center">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
              A small pause
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 max-w-xl font-serif text-3xl leading-[1.2] text-[var(--color-foreground)] md:text-[2.4rem]">
              Take one breath before you keep scrolling.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative mt-14 flex h-56 w-56 items-center justify-center md:h-64 md:w-64">
              {/* halo rings */}
              <div
                aria-hidden
                className="breath-circle absolute inset-0 rounded-full opacity-40 blur-2xl"
                style={{ background: "var(--color-accent)" }}
              />
              <div
                aria-hidden
                className="breath-circle absolute inset-6 rounded-full opacity-60"
                style={{ background: "var(--color-accent-soft)" }}
              />
              <div
                aria-hidden
                className="breath-circle absolute inset-12 rounded-full"
                style={{ background: "var(--color-surface)" }}
              />
              <p
                aria-live="polite"
                className="relative z-10 max-w-[10rem] font-serif text-lg italic leading-snug text-[var(--color-foreground)]"
              >
                {reduceMotion
                  ? "a breath, at your own pace"
                  : PHASES[phase]}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-12 max-w-md text-[15px] leading-relaxed text-[var(--color-muted)]">
              That small settling you might feel? That&apos;s the work. Sessions
              are an hour of exactly that — at whatever pace your body asks for.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
