"use client";

import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import type { Testimonial } from "@/sanity/types";

type Props = {
  testimonials: Testimonial[];
};

/**
 * HAVEN — testimonials as a whisper. Embla with the fade plugin: quotes
 * dissolve into each other on a slow autoplay, no arrows, no urgency —
 * just soft dots if you want to linger. The anti-carousel carousel.
 */
export function FadeTestimonials({ testimonials }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 45 }, [
    Fade(),
    Autoplay({ delay: 6500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-[var(--color-background)] py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
            Gentle words from the room
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-3xl overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t) => (
                <div key={t._id} className="min-w-0 flex-[0_0_100%]">
                  <figure className="px-2 text-center md:px-10">
                    <blockquote className="font-serif text-2xl italic leading-[1.5] text-[var(--color-foreground)] md:text-[1.7rem]">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-6 text-sm text-[var(--color-muted)]">
                      <span className="font-medium text-[var(--color-accent-strong)]">
                        {t.attribution}
                      </span>
                      {t.context ? <span> · {t.context}</span> : null}
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex justify-center gap-2.5">
          {testimonials.map((t, i) => (
            <button
              key={t._id}
              type="button"
              aria-label={`Show quote ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: selected === i ? 26 : 7,
                background:
                  selected === i
                    ? "var(--color-accent)"
                    : "var(--color-subtle)",
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
