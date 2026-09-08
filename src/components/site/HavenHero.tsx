"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/Container";
import { Float } from "@/components/motion/Float";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ParticleField } from "@/components/motion/ParticleField";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { SanityImg } from "@/components/SanityImg";
import type { HomePage } from "@/sanity/types";

type Props = {
  home: HomePage;
};

/**
 * HAVEN structural signature — the sanctuary hero. Unlike every other
 * template's split-column hero, Haven opens centered and near-full-height:
 * layered aurora washes, drifting dust motes, generous air on every side,
 * and a single soft path forward. It should feel like stepping into a quiet
 * room, not landing on a website.
 */
export function HavenHero({ home }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-[var(--color-surface)]">
      {/* layered aurora washes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Float duration={14} distance={10}>
          <div
            className="absolute -top-32 left-[8%] h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--color-accent)" }}
          />
        </Float>
        <Float duration={18} distance={12}>
          <div
            className="absolute right-[4%] top-1/4 h-[380px] w-[380px] rounded-full opacity-40 blur-3xl"
            style={{ background: "var(--color-accent-soft)" }}
          />
        </Float>
        <Float duration={16} distance={8}>
          <div
            className="absolute bottom-[-10%] left-1/3 h-[360px] w-[360px] rounded-full opacity-25 blur-3xl"
            style={{ background: "#b9c6e4" }}
          />
        </Float>
      </div>

      <ParticleField className="pointer-events-none absolute inset-0" />

      <Container className="relative py-24 text-center md:py-32">
        <div className="mx-auto max-w-3xl">
          {home.heroImage?.asset || home.heroImage?.demoUrl ? (
            <Reveal delay={0} distance={14} duration={1.1} className="mb-8">
              <Float duration={11} distance={7}>
                <div className="mx-auto h-28 w-28 overflow-hidden rounded-full shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] ring-4 ring-white/60 md:h-36 md:w-36">
                  <SanityImg
                    image={home.heroImage}
                    alt={home.heroImage?.alt ?? ""}
                    width={288}
                    height={288}
                    priority
                    className="h-full w-full object-cover"
                    sizes="144px"
                  />
                </div>
              </Float>
            </Reveal>
          ) : null}

          {home.heroEyebrow ? (
            <Reveal delay={0.1} distance={10} duration={0.9}>
              <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-[var(--color-accent-strong)]">
                {home.heroEyebrow}
              </p>
            </Reveal>
          ) : null}

          <h1 className="mt-8 font-serif text-[2.6rem] leading-[1.15] tracking-tight text-[var(--color-foreground)] md:text-[3.8rem]">
            <WordReveal text={home.heroHeading ?? ""} stagger={0.09} />
          </h1>

          {home.heroSubhead ? (
            <Reveal delay={0.6} distance={16} duration={1.1}>
              <p className="mx-auto mt-8 max-w-xl text-balance text-lg leading-[1.85] text-[var(--color-muted)]">
                {home.heroSubhead}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={0.85} distance={12} duration={0.9}>
            <div className="mt-11 flex flex-col items-center gap-5">
              {home.primaryCta?.label ? (
                <MagneticButton
                  href={home.primaryCta.href ?? "/contact"}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-9 py-4 text-sm font-medium text-white shadow-[0_16px_40px_-18px_var(--color-accent-strong)] transition hover:bg-[var(--color-accent-strong)]"
                >
                  {home.primaryCta.label}
                </MagneticButton>
              ) : null}
              {home.secondaryCta?.label ? (
                <a
                  href={home.secondaryCta.href ?? "/services"}
                  className="text-sm text-[var(--color-muted)] underline decoration-[var(--color-subtle)] underline-offset-4 transition hover:text-[var(--color-accent-strong)] hover:decoration-[var(--color-accent)]"
                >
                  {home.secondaryCta.label}
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>

        {/* scroll hint — a slow, patient bob */}
        {!reduceMotion ? (
          <motion.div
            aria-hidden
            className="absolute bottom-[-3.5rem] left-1/2 -translate-x-1/2 text-[var(--color-muted)]/70 md:bottom-[-4.5rem]"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="block text-center text-[11px] uppercase tracking-[0.26em]">
              scroll softly
            </span>
            <span className="mt-1 block text-center">↓</span>
          </motion.div>
        ) : null}
      </Container>
    </section>
  );
}
