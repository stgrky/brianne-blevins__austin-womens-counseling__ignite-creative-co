import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { AboutSticky } from "@/components/site/AboutSticky";
import { defaultAboutPage } from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import { aboutPageQuery } from "@/sanity/queries";
import type { AboutPage } from "@/sanity/types";

export const metadata: Metadata = {
  title: "About",
};

async function getAbout() {
  return safeFetch<AboutPage>(aboutPageQuery, {}, defaultAboutPage);
}

export default async function AboutPageRoute() {
  const about = await getAbout();

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-[var(--color-surface)]">
        <Container className="py-20 text-center md:py-28">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
              About
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-[var(--color-foreground)] md:text-[3.4rem]">
              {about.heading ?? "About me"}
            </h1>
          </Reveal>
        </Container>
      </section>

      {/* ── PORTRAIT + INTRO (sticky-scroll editorial moment) ── */}
      <AboutSticky portrait={about.portrait} intro={about.intro} />

      {/* ── LONG-FORM BODY ── */}
      {about.body?.length ? (
        <section className="bg-[var(--color-background)] py-16 md:py-24">
          <Container>
            <Reveal>
              <article className="prose-serif mx-auto max-w-2xl text-lg text-[var(--color-foreground)]">
                <PortableTextRenderer value={about.body} />
              </article>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* ── CREDENTIALS ── */}
      {about.credentials?.length ? (
        <section className="bg-[var(--color-background)] pb-20 md:pb-28">
          <Container>
            <Reveal>
              <div
                className="mx-auto max-w-2xl rounded-2xl p-8 md:p-10"
                style={{ background: "var(--color-accent-soft)" }}
              >
                <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
                  Credentials &amp; training
                </p>
                <ul className="mt-6 grid gap-3 text-base text-[var(--color-foreground)] sm:grid-cols-2">
                  {about.credentials.map((cred) => (
                    <li
                      key={cred}
                      className="flex items-start gap-3 leading-snug"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 flex-shrink-0 rounded-full"
                        style={{ background: "var(--color-accent-strong)" }}
                      />
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* ── CLOSING CTA ── */}
      <section className="bg-[var(--color-surface)] py-20 md:py-28">
        <Container className="text-center">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
              Ready to begin?
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-serif text-3xl leading-[1.15] text-[var(--color-foreground)] md:text-[2.4rem]">
              If any of this sounds like a fit, let&apos;s talk.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
              A brief consult is the easiest way to know whether we&apos;re a
              good match. No pressure, no pitch.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(74,106,93,0.5)] transition hover:bg-[var(--color-accent-strong)]"
            >
              Book a free consult
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
