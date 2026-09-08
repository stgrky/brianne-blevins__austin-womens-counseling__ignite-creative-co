import Link from "next/link";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PostCard } from "@/components/PostCard";
import { BreathingCircle } from "@/components/site/BreathingCircle";
import { CalmBand } from "@/components/site/CalmBand";
import { CtaBanner } from "@/components/site/CtaBanner";
import { FadeTestimonials } from "@/components/site/FadeTestimonials";
import { GardenPath } from "@/components/site/GardenPath";
import { HavenHero } from "@/components/site/HavenHero";
import { ModalityCards } from "@/components/site/ModalityCards";
import { ModalityDrift } from "@/components/site/ModalityDrift";
import { PricingBlock } from "@/components/site/PricingBlock";
import { StickyAbout } from "@/components/site/StickyAbout";
import {
  defaultHomePage,
  defaultPosts,
  defaultServicesPage,
  defaultTestimonials,
} from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import {
  allPostsQuery,
  featuredTestimonialsQuery,
  homePageQuery,
  servicesPageQuery,
} from "@/sanity/queries";
import type {
  HomePage,
  PostListItem,
  ServicesPage,
  Testimonial,
} from "@/sanity/types";

async function getHome() {
  return safeFetch<HomePage>(homePageQuery, {}, defaultHomePage);
}

async function getRecentBlogPosts() {
  const posts = await safeFetch<PostListItem[]>(allPostsQuery, {}, defaultPosts);
  return posts.slice(0, 3);
}

async function getTestimonials() {
  return safeFetch<Testimonial[]>(
    featuredTestimonialsQuery,
    {},
    defaultTestimonials
  );
}

export default async function HomePageRoute() {
  const [home, services, recentPosts, testimonials] = await Promise.all([
    getHome(),
    safeFetch<ServicesPage>(servicesPageQuery, {}, defaultServicesPage),
    getRecentBlogPosts(),
    getTestimonials(),
  ]);

  return (
    <>
      <HavenHero home={home} />

      {home.showModalityDrift !== false ? (
        <ModalityDrift modalities={home.modalities ?? []} />
      ) : null}

      <GardenPath
        heading={home.whatToExpectHeading}
        intro={home.whatToExpectIntro}
        steps={home.whatToExpectSteps}
      />

      {home.showBreathingCircle !== false ? <BreathingCircle /> : null}

      <ModalityCards services={services} />

      <StickyAbout home={home} />

      <FadeTestimonials testimonials={testimonials} />

      {home.showCalmBand !== false ? <CalmBand /> : null}

      <PricingBlock home={home} />

      <CtaBanner
        ctaLabel={home.primaryCta?.label ?? "Book a free consult"}
        ctaHref={home.primaryCta?.href ?? "/contact"}
      />

      {recentPosts.length > 0 ? (
        <section className="bg-[var(--color-background)] py-24 md:py-32">
          <Container>
            <div className="flex items-end justify-between">
              <Reveal>
                <h2 className="font-serif text-3xl leading-[1.15] text-[var(--color-foreground)] md:text-[2.2rem]">
                  From the blog
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-[var(--color-accent-strong)] transition-colors hover:text-[var(--color-foreground)]"
                >
                  All posts →
                </Link>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {recentPosts.map((post, i) => (
                <Reveal
                  key={post._id}
                  delay={0.1 + i * 0.1}
                  className="h-full"
                >
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
