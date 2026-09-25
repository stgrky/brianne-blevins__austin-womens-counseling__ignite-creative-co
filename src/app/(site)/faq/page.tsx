import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/site/FaqSection";
import { defaultContactPage } from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import { contactPageQuery } from "@/sanity/queries";
import type { ContactPage } from "@/sanity/types";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions people ask before a first session — fees, insurance, telehealth, and what to expect.",
  alternates: { canonical: "/faq" },
};

/**
 * The FAQ on its own page, at the client's request (2026-09-23), so it can sit
 * under Services in the menu.
 *
 * The questions still live on the contact page document in the editor, because
 * that is where she already writes them and moving them would have meant
 * retyping. One source, one place to edit, two possible homes.
 */
export default async function FaqPageRoute() {
  const contact = await safeFetch<ContactPage>(contactPageQuery, {}, defaultContactPage);
  const faqs = contact.faqs ?? [];

  return (
    <>
      <section className="bg-[var(--color-surface)]">
        <Container className="py-20 text-center md:py-24">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
              Before you reach out
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-[var(--color-foreground)] md:text-[3.2rem]">
              {contact.faqHeading ?? "Questions people ask first"}
            </h1>
          </Reveal>
        </Container>
      </section>

      {faqs.length > 0 ? (
        <FaqSection faqs={faqs} eyebrow="" />
      ) : (
        <section className="bg-[var(--color-background)] py-20">
          <Container className="text-center">
            <p className="text-[var(--color-muted)]">
              Questions are being added here shortly.
            </p>
          </Container>
        </section>
      )}

      <section className="bg-[var(--color-surface)] py-16 md:py-20">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-xl leading-relaxed text-[var(--color-muted)]">
              Still wondering about something?{" "}
              <Link
                href="/contact"
                className="font-semibold text-[var(--color-accent-strong)] underline decoration-[var(--color-subtle)] underline-offset-4 transition hover:decoration-[var(--color-accent)]"
              >
                Ask me directly
              </Link>{" "}
              — no question is too small.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
