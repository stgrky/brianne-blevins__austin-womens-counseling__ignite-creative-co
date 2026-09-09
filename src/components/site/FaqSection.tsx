import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import type { FaqItem } from "@/sanity/types";

type Props = {
  heading?: string;
  faqs?: FaqItem[];
  eyebrow?: string;
};

/**
 * HAVEN — FAQ. Soft rounded panels using native <details>, so it works
 * without JS and stays a server component (no hydration cost, and the
 * JSON-LD below never depends on the client).
 *
 * Bundled exclusively with the SEO Setup add-on — not a standard feature on
 * any template. The exception is a client whose signed CSA scopes it into the
 * included revision hours instead (Brianne Blevins, 2026-09); the agreement
 * governs, so it ships here.
 *
 * Emits FAQPage JSON-LD alongside the visible section. Google deprecated the
 * visual FAQ rich result in search on 2026-05-07 (already gov/health-only
 * since 2023-08), so this markup no longer produces an expandable search
 * snippet — Google states it still uses the data to understand page content.
 * Describe it on that basis, never as a search-appearance feature.
 */
export function FaqSection({
  heading,
  faqs,
  eyebrow = "Before you reach out",
}: Props) {
  const items = (faqs ?? []).filter((faq) => faq.question && faq.answer);
  if (!heading || items.length === 0) return null;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section className="bg-[var(--color-surface)] py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
                {eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-serif text-3xl leading-[1.2] text-[var(--color-foreground)] md:text-[2.4rem]">
                {heading}
              </h2>
            </Reveal>
          </div>

          <div className="mt-12 space-y-4">
            {items.map((faq, i) => (
              <Reveal key={faq.question ?? i} delay={0.06 * i}>
                <details className="group overflow-hidden rounded-[2rem] border border-[var(--color-subtle)]/50 bg-[var(--color-background)] px-7 py-5 shadow-[var(--shadow-card)] transition-colors duration-700 hover:border-[var(--color-accent)]/50 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5">
                    <span className="font-serif text-lg leading-snug text-[var(--color-foreground)]">
                      {faq.question}
                    </span>
                    <span
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-lg text-[var(--color-accent-strong)] transition-transform duration-500 group-open:rotate-45"
                      style={{ background: "var(--color-accent-soft)" }}
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
