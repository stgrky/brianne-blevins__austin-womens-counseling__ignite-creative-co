import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { defaultNoticesPage } from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import { noticesPageQuery } from "@/sanity/queries";
import type { NoticesPage } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Notices",
  description:
    "Licensure and verification, how to file a complaint, and how to request your records.",
};

/**
 * The page that carries what the boards require: how to verify a license, how
 * to complain, how to get your records. Dry by design — someone reading this
 * is checking a fact, not being sold to, and the fastest possible answer is
 * the courteous one.
 *
 * Every verification link goes to the state board itself rather than to a
 * screenshot or a claim, which is the whole point: the visitor confirms the
 * license at the source.
 */
export default async function NoticesPageRoute() {
  const notices = await safeFetch<NoticesPage>(noticesPageQuery, {}, defaultNoticesPage);
  const licenses = notices.licensure ?? [];
  const sections = notices.sections ?? [];

  return (
    <>
      <section className="bg-[var(--color-surface)]">
        <Container className="py-20 text-center md:py-24">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
              Required information
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-[var(--color-foreground)] md:text-[3.2rem]">
              {notices.heading ?? "Notices"}
            </h1>
          </Reveal>
          {notices.intro ? (
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
                {notices.intro}
              </p>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {licenses.length > 0 ? (
        <section className="bg-[var(--color-background)] py-16 md:py-20">
          <Container>
            <div className="max-w-2xl">
              <Reveal>
                <h2 className="font-serif text-2xl leading-snug text-[var(--color-foreground)] md:text-3xl">
                  {notices.licensureHeading ?? "Licensure & verification"}
                </h2>
              </Reveal>
              {notices.licensureIntro ? (
                <Reveal delay={0.08}>
                  <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
                    {notices.licensureIntro}
                  </p>
                </Reveal>
              ) : null}
            </div>

            <div className="mt-10 border-t border-[var(--color-subtle)]">
              {licenses.map((license, index) => (
                <Reveal key={`${license.state}-${index}`} delay={Math.min(index * 0.05, 0.2)}>
                  <div className="grid gap-2 border-b border-[var(--color-subtle)] py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] md:items-baseline md:gap-8">
                    <p className="font-serif text-lg text-[var(--color-foreground)]">
                      {license.state}
                      {license.credential ? (
                        <span className="text-[var(--color-muted)]"> · {license.credential}</span>
                      ) : null}
                    </p>
                    <p className="text-[15px] leading-relaxed text-[var(--color-muted)]">
                      {license.boardName}
                      {license.licenseNumber ? (
                        <>
                          {" · License "}
                          <span className="text-[var(--color-foreground)]">
                            {license.licenseNumber}
                          </span>
                        </>
                      ) : null}
                    </p>
                    {license.verifyUrl ? (
                      <a
                        href={license.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[var(--color-accent-strong)] underline decoration-[var(--color-subtle)] underline-offset-4 transition hover:decoration-[var(--color-accent)] md:justify-self-end"
                      >
                        Verify this license ↗
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {sections.length > 0 ? (
        <section className="bg-[var(--color-surface)] py-16 md:py-20">
          <Container>
            <div className="grid gap-10 md:grid-cols-2 md:gap-12">
              {sections.map((section, index) => (
                <Reveal key={`${section.title}-${index}`} delay={Math.min(index * 0.06, 0.24)}>
                  <div>
                    <h2 className="font-serif text-xl leading-snug text-[var(--color-foreground)] md:text-2xl">
                      {section.title}
                    </h2>
                    {section.body ? (
                      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[var(--color-muted)]">
                        {section.body
                          .split(/\n{2,}/)
                          .map((paragraph) => paragraph.trim())
                          .filter(Boolean)
                          .map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                      </div>
                    ) : null}
                    {/* A URL with no label used to render nothing at all, so a
                        link typed into the Studio simply disappeared. The label
                        is a nicety; the link is the point. Falls back to the
                        site's own domain, which reads better than "link here". */}
                    {section.linkUrl ? (
                      <a
                        href={section.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent-strong)] underline decoration-[var(--color-subtle)] underline-offset-4 transition hover:decoration-[var(--color-accent)]"
                      >
                        {section.linkLabel?.trim() ||
                          section.linkUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}{" "}
                        ↗
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
