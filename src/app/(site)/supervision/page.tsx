import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { AssociatesGrid } from "@/components/site/AssociatesGrid";
import { defaultSupervisionPage } from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import { supervisionPageQuery } from "@/sanity/queries";
import type { SupervisionPage } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Supervision & Consultation",
  description:
    "Clinical supervision for associates working toward licensure, and consultation for licensed clinicians.",
  alternates: { canonical: "/supervision" },
};

/**
 * Supervision & Consultation — for clinicians rather than clients.
 *
 * The supervisee directory lives here, not on About: they train under her
 * supervision, they don't practise under her business, and the page says so
 * plainly so neither side is misrepresented.
 */
export default async function SupervisionPageRoute() {
  const page = await safeFetch<SupervisionPage>(
    supervisionPageQuery,
    {},
    defaultSupervisionPage,
  );
  const offerings = page.offerings ?? [];

  return (
    <>
      <section className="bg-[var(--color-surface)]">
        <Container className="py-20 text-center md:py-24">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
              For clinicians
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-[var(--color-foreground)] md:text-[3.2rem]">
              {page.heading ?? "Supervision & Consultation"}
            </h1>
          </Reveal>
          {page.intro ? (
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
                {page.intro}
              </p>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {offerings.length > 0 ? (
        <section className="bg-[var(--color-background)] py-16 md:py-24">
          <Container>
            <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
              {offerings.map((offering, index) => (
                <Reveal key={`${offering.title}-${index}`} delay={0.08 * index} className="h-full">
                  <article className="flex h-full flex-col rounded-[2.5rem] border border-[var(--color-subtle)]/50 bg-[var(--color-surface)] px-8 py-10 shadow-[var(--shadow-card)]">
                    <h2 className="font-serif text-2xl leading-tight text-[var(--color-foreground)]">
                      {offering.title}
                    </h2>
                    {offering.detail ? (
                      <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent-strong)]">
                        {offering.detail}
                      </p>
                    ) : null}
                    {offering.body ? (
                      <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-muted)]">
                        {offering.body}
                      </p>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <AssociatesGrid
        eyebrow="Supervision"
        heading={page.superviseesHeading}
        intro={page.superviseesIntro}
        people={page.supervisees}
      />

      {page.ctaHeading ? (
        <section className="bg-[var(--color-surface)] py-16 md:py-24">
          <Container className="text-center">
            <Reveal>
              <h2 className="font-serif text-3xl leading-[1.15] text-[var(--color-foreground)] md:text-[2.2rem]">
                {page.ctaHeading}
              </h2>
            </Reveal>
            {page.ctaBody ? (
              <Reveal delay={0.08}>
                <p className="mx-auto mt-5 max-w-xl leading-relaxed text-[var(--color-muted)]">
                  {page.ctaBody}
                </p>
              </Reveal>
            ) : null}
            <Reveal delay={0.16}>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
              >
                Get in touch
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </Container>
        </section>
      ) : null}
    </>
  );
}
