import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { safeFetch } from "@/sanity/client";
import { formsPageQuery } from "@/sanity/queries";
import type { FormsPage } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Client forms",
  description: "Paperwork to complete after your consultation.",
  // Onboarding paperwork for people who have already been seen. Nobody should
  // arrive here from a search, and a practice looks odd when its forms rank
  // above its services.
  robots: { index: false, follow: true },
};

/**
 * Client forms: links out to paperwork, nothing more.
 *
 * The notice at the top is the reason this page exists in this shape. Her
 * words, 2026-10-07: "I've had people I've never met send all their info and
 * then never become clients, which can make it weird." So the page says when
 * to fill these in before it says anything else, and it is reached by a link
 * she sends rather than by browsing.
 *
 * The forms themselves are Paubox, which holds the BAA and is built to take
 * clinical detail. Nothing typed into them touches this site.
 */
export default async function FormsPageRoute() {
  const page = await safeFetch<FormsPage | null>(formsPageQuery, {}, null);
  const forms = (page?.forms ?? []).filter((f) => f.url);

  // Nothing to show is not an empty page. Until she adds a form, this does not
  // exist, the same way the blog does until there is a post.
  if (!page || forms.length === 0) notFound();

  return (
    <>
      <section className="bg-[var(--color-surface)]">
        <Container className="py-20 text-center md:py-24">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
              For current clients
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-[var(--color-foreground)] md:text-[3.2rem]">
              {page.heading ?? "Client forms"}
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

      <section className="bg-[var(--color-background)] py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            {page.notice ? (
              <Reveal>
                {/* Above the forms, not below them. Someone who is going to
                    fill one in early will have clicked before reaching a
                    footnote. */}
                <p className="rounded-2xl border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)]/60 px-6 py-5 text-center text-[15px] font-medium leading-relaxed text-[var(--color-foreground)]">
                  {page.notice}
                </p>
              </Reveal>
            ) : null}

            <div className="mt-8 space-y-4">
              {forms.map((form, i) => (
                <Reveal key={form.url ?? i} delay={0.06 * i}>
                  <a
                    href={form.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-6 rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] p-6 transition hover:border-[var(--color-accent)]"
                  >
                    <span>
                      <span className="block font-serif text-xl leading-snug text-[var(--color-foreground)]">
                        {form.title ?? "Form"}
                      </span>
                      {form.description ? (
                        <span className="mt-2 block text-[15px] leading-relaxed text-[var(--color-muted)]">
                          {form.description}
                        </span>
                      ) : null}
                    </span>
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 text-sm font-semibold text-[var(--color-accent-strong)]"
                    >
                      Open ↗
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            {page.footnote ? (
              <Reveal delay={0.16}>
                <p className="mt-8 text-sm leading-relaxed text-[var(--color-muted)]">
                  {page.footnote}
                </p>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </section>
    </>
  );
}
