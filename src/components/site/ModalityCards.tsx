"use client";

import Link from "next/link";

import { Container } from "@/components/Container";
import { Float } from "@/components/motion/Float";
import { Reveal } from "@/components/motion/Reveal";
import type { ServicesPage } from "@/sanity/types";

type Props = {
  services: ServicesPage;
};

/**
 * HAVEN signature (from the template spec) — modalities as gentle cards.
 * Extra-round "pebble" cards arranged in a soft arc (middle card sits
 * lower), icons bobbing slowly in their own halos. Everything is an
 * invitation; the CTA is a whisper, not a button.
 */
export function ModalityCards({ services }: Props) {
  const list = services.services ?? [];
  if (list.length === 0) return null;

  const arc = ["md:translate-y-0", "md:translate-y-12", "md:translate-y-4"];

  return (
    <section className="relative -mt-8 rounded-t-[3rem] bg-[var(--color-surface)] py-20 md:rounded-t-[4rem] md:py-28 md:pb-40">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
              Ways we can work
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-serif text-3xl leading-[1.2] text-[var(--color-foreground)] md:text-[2.4rem]">
              Every modality is an invitation — never a prescription.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-7">
          {list.slice(0, 3).map((service, i) => (
            <Reveal
              key={service.title}
              delay={0.12 * i}
              className={`h-full ${arc[i] ?? ""}`}
            >
              <div className="flex h-full flex-col items-center rounded-[2.5rem] border border-[var(--color-subtle)]/50 bg-[var(--color-background)] px-8 py-10 text-center shadow-[var(--shadow-card)] transition-colors duration-700 hover:border-[var(--color-accent)]/50">
                <Float duration={7 + i} distance={6}>
                  <span
                    className="flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                    style={{ background: "var(--color-accent-soft)" }}
                    aria-hidden
                  >
                    {service.icon}
                  </span>
                </Float>
                <h3 className="mt-7 font-serif text-2xl leading-tight text-[var(--color-foreground)]">
                  {service.title}
                </h3>
                {service.description ? (
                  <p className="mt-4 text-[15px] leading-[1.8] text-[var(--color-muted)]">
                    {service.description}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-16 text-center md:mt-24">
            <Link
              href="/services"
              className="text-sm text-[var(--color-muted)] underline decoration-[var(--color-subtle)] underline-offset-4 transition hover:text-[var(--color-accent-strong)] hover:decoration-[var(--color-accent)]"
            >
              See how each one feels in a session
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
