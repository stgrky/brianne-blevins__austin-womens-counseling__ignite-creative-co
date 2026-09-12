import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SanityImg } from "@/components/SanityImg";
import type { SanityImageWithAlt } from "@/sanity/types";

/**
 * Certification and membership marks, centred on their own, the way
 * practices usually display them — standing apart rather than tucked into
 * a list. Hides itself when there are none.
 *
 * Upload these with transparent backgrounds. A badge saved as a JPEG
 * carries a baked-in white square that reads as a white box against any
 * tinted section.
 */
export function CredentialBadges({
  badges,
}: {
  badges?: SanityImageWithAlt[];
}) {
  if (!badges?.length) return null;

  // No vertical padding of its own: the credentials card above and the next
  // section below both carry their own spacing, and doubling it up strands
  // the badge in the middle of a large empty band.
  return (
    <section className="bg-[var(--color-background)]">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {badges.map((badge, i) => (
              <SanityImg
                key={badge.asset?._ref ?? i}
                image={badge}
                alt={badge.alt ?? "Credential badge"}
                width={400}
                height={440}
                className="h-28 w-auto object-contain md:h-32"
                sizes="128px"
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
