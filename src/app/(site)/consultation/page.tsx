import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { Reveal } from "@/components/motion/Reveal";
import { safeFetch } from "@/sanity/client";
import { consultationPageQuery } from "@/sanity/queries";
import type { ConsultationPage } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Consultation",
  description:
    "Case consultation for licensed clinicians, including perinatal mental health and working with women's issues.",
  alternates: { canonical: "/consultation" },
};

/**
 * Consultation, split from the Supervision page at her request.
 *
 * Two different readers: supervision is for associates working toward
 * licensure, consultation is for clinicians who already hold a license. Her
 * own site kept them apart and she wanted that back, since together they were
 * "too much info side by side".
 *
 * Deliberately a sibling of /supervision rather than a new look: same hero,
 * same rhythm, same closing call. They are two halves of what she offers other
 * clinicians, and should read that way.
 */
export default async function ConsultationPageRoute() {
  const page = await safeFetch<ConsultationPage | null>(consultationPageQuery, {}, null);
  if (!page) return null;

  return (
    <>
      <section className="bg-[var(--color-surface)]">
        <Container className="py-20 text-center md:py-24">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
              {page.eyebrow ?? "For licensed clinicians"}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-[var(--color-foreground)] md:text-[3.2rem]">
              {page.heading ?? "Consultation"}
            </h1>
          </Reveal>
          {page.intro ? (
            <Reveal delay={0.14}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
                {page.intro}
              </p>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {page.body?.length ? (
        <section className="bg-[var(--color-background)] py-16 md:py-24">
          <Container>
            <Reveal>
              <article className="prose-serif mx-auto max-w-2xl text-lg text-[var(--color-foreground)]">
                <PortableTextRenderer value={page.body} />
              </article>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {page.ctaHeading || page.ctaBody ? (
        <section className="bg-[var(--color-surface)] py-20 md:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              {page.ctaHeading ? (
                <Reveal>
                  <h2 className="font-serif text-3xl leading-[1.2] text-[var(--color-foreground)] md:text-[2.4rem]">
                    {page.ctaHeading}
                  </h2>
                </Reveal>
              ) : null}
              {page.ctaBody ? (
                <Reveal delay={0.08}>
                  <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
                    {page.ctaBody}
                  </p>
                </Reveal>
              ) : null}
              <Reveal delay={0.14}>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
                >
                  Get in touch
                  <span aria-hidden>&rarr;</span>
                </Link>
              </Reveal>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
