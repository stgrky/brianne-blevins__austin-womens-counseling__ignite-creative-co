import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SanityImg } from "@/components/SanityImg";
import type { AboutPage } from "@/sanity/types";

/**
 * HAVEN — the associates directory. Soft pebble cards with round portraits,
 * matching ModalityCards' language rather than a hard "team grid."
 *
 * Client-managed: every entry comes from `aboutPage.associates`, so the
 * practice adds and removes people themselves in the Studio without touching
 * code. Section hides entirely when there's no heading or nobody listed.
 */
export function AssociatesGrid({ about }: { about: AboutPage }) {
  const associates = about.associates ?? [];
  if (!about.associatesHeading || associates.length === 0) return null;

  return (
    <section className="bg-[var(--color-background)] py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
              The practice
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-serif text-3xl leading-[1.2] text-[var(--color-foreground)] md:text-[2.4rem]">
              {about.associatesHeading}
            </h2>
          </Reveal>
          {about.associatesIntro ? (
            <Reveal delay={0.14}>
              <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)]">
                {about.associatesIntro}
              </p>
            </Reveal>
          ) : null}
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {associates.map((person, i) => (
            <Reveal key={person.name ?? i} delay={0.08 * i} className="h-full">
              <div className="flex h-full flex-col items-center rounded-[2.5rem] border border-[var(--color-subtle)]/50 bg-[var(--color-surface)] px-8 py-10 text-center shadow-[var(--shadow-card)] transition-colors duration-700 hover:border-[var(--color-accent)]/50">
                {person.photo ? (
                  <div
                    className="overflow-hidden rounded-full"
                    style={{ background: "var(--color-accent-soft)" }}
                  >
                    <SanityImg
                      image={person.photo}
                      alt={person.photo.alt ?? person.name ?? "Associate"}
                      width={320}
                      height={320}
                      className="h-28 w-28 object-cover"
                      sizes="112px"
                    />
                  </div>
                ) : (
                  <span
                    className="flex h-28 w-28 items-center justify-center rounded-full font-serif text-3xl text-[var(--color-accent-strong)]"
                    style={{ background: "var(--color-accent-soft)" }}
                    aria-hidden
                  >
                    {person.name?.trim().charAt(0) ?? "·"}
                  </span>
                )}

                <h3 className="mt-6 font-serif text-2xl leading-tight text-[var(--color-foreground)]">
                  {person.name}
                </h3>
                {person.credentials ? (
                  <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent-strong)]">
                    {person.credentials}
                  </p>
                ) : null}
                {person.bio ? (
                  <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {person.bio}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
