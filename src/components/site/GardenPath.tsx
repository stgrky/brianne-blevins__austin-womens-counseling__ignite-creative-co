import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import type { HomePage } from "@/sanity/types";

type Props = {
  heading?: HomePage["whatToExpectHeading"];
  intro?: HomePage["whatToExpectIntro"];
  steps?: HomePage["whatToExpectSteps"];
};

/**
 * HAVEN structural signature — the garden path. Where other templates show
 * "what to expect" as a card row, Haven walks you down a soft dotted line,
 * steps alternating left and right like stones on a path. Reads as a
 * journey taken slowly, which is the whole promise of the practice.
 */
export function GardenPath({ heading, intro, steps }: Props) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="relative -mt-8 rounded-t-[3rem] bg-[var(--color-background)] py-20 md:rounded-t-[4rem] md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {heading ? (
            <Reveal>
              <h2 className="font-serif text-3xl leading-[1.2] text-[var(--color-foreground)] md:text-[2.4rem]">
                {heading}
              </h2>
            </Reveal>
          ) : null}
          {intro ? (
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-balance text-lg leading-relaxed text-[var(--color-muted)]">
                {intro}
              </p>
            </Reveal>
          ) : null}
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* the path — a soft dotted spine */}
          <div
            aria-hidden
            className="absolute left-6 top-2 bottom-2 border-l-2 border-dotted border-[var(--color-accent)]/40 md:left-1/2 md:-translate-x-px"
          />

          <div className="space-y-14 md:space-y-20">
            {steps.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <Reveal key={`${step.title}-${i}`} delay={0.12 * i}>
                  <div
                    className={`relative flex items-start gap-6 pl-16 md:w-1/2 md:pl-0 ${
                      right
                        ? "md:ml-auto md:pl-14"
                        : "md:mr-auto md:flex-row-reverse md:pr-14 md:text-right"
                    }`}
                  >
                    {/* stepping stone */}
                    <span
                      className={`absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full text-xl shadow-[var(--shadow-card)] md:static md:h-14 md:w-14 md:flex-shrink-0`}
                      style={{ background: "var(--color-accent-soft)" }}
                      aria-hidden
                    >
                      {step.icon ?? "•"}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl leading-snug text-[var(--color-foreground)] md:text-2xl">
                        {step.title}
                      </h3>
                      {step.body ? (
                        <p className="mt-2.5 text-[15px] leading-[1.8] text-[var(--color-muted)]">
                          {step.body}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* the path ends where you do */}
          <div
            aria-hidden
            className="mt-14 flex justify-start pl-3 md:justify-center md:pl-0"
          >
            <span
              className="h-4 w-4 rounded-full"
              style={{ background: "var(--color-accent)" }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
