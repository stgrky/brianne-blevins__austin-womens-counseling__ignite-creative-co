import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { defaultServicesPage } from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import { servicesPageQuery } from "@/sanity/queries";
import type { ServicesPage } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Services",
};

async function getServices() {
  return safeFetch<ServicesPage>(servicesPageQuery, {}, defaultServicesPage);
}

export default async function ServicesPageRoute() {
  const services = await getServices();
  const list = services.services ?? [];

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-[var(--color-surface)]">
        <Container className="py-20 text-center md:py-28">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-accent-strong)]">
              Services
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-[var(--color-foreground)] md:text-[3.4rem]">
              {services.heading ?? "How I can help"}
            </h1>
          </Reveal>
          {services.intro ? (
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
                {services.intro}
              </p>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* ── SERVICES GRID ── */}
      {list.length > 0 ? (
        <section className="bg-[var(--color-background)] py-20 md:py-24">
          <Container>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {list.map((service, index) => (
                <Reveal
                  key={`${service.title}-${index}`}
                  delay={0.1 + index * 0.08}
                  className="h-full"
                >
                  <article
                    className="group relative flex h-full flex-col rounded-2xl border border-[var(--color-subtle)]/70 bg-[var(--color-surface)] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-accent)]/70 hover:shadow-[0_24px_60px_-28px_rgba(74,106,93,0.35)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {service.icon ? (
                        <div
                          aria-hidden
                          className="flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-transform duration-500 group-hover:scale-110"
                          style={{ background: "var(--color-accent-soft)" }}
                        >
                          {service.icon}
                        </div>
                      ) : null}
                      <span className="font-serif text-sm tracking-wide text-[var(--color-muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="mt-7 font-serif text-2xl leading-tight text-[var(--color-foreground)] md:text-[1.7rem]">
                      {service.title}
                    </h2>
                    {service.description ? (
                      <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted)]">
                        {service.description}
                      </p>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── CLOSING CTA ── */}
      <section className="bg-[var(--color-surface)] py-20 md:py-28">
        <Container>
          <Reveal>
            <div
              className="mx-auto max-w-3xl rounded-2xl p-10 text-center md:p-14"
              style={{ background: "var(--color-accent-soft)" }}
            >
              <h2 className="font-serif text-2xl leading-tight text-[var(--color-foreground)] md:text-[2rem]">
                Not sure where to start?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[var(--color-muted)]">
                A free 15-minute consultation is the easiest way to figure out
                whether the work I do fits what you&apos;re looking for.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(74,106,93,0.5)] transition hover:bg-[var(--color-accent-strong)]"
              >
                Schedule a consultation
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
