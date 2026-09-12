import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Link from "next/link";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Pagination } from "@/components/Pagination";
import { SanityImg } from "@/components/SanityImg";
import { demoBlogIndex } from "@/lib/demo-posts";
import { formatDateLong } from "@/lib/format";
import { safeFetch } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import { blogIndexQuery } from "@/sanity/queries";
import type { BlogIndexResult } from "@/sanity/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
};

const POSTS_PER_PAGE = 6;

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

function parsePage(raw: string | undefined) {
  const parsed = Number.parseInt(raw ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return parsed;
}

export default async function BlogIndexRoute({ searchParams }: BlogPageProps) {
  const { page: rawPage } = await searchParams;
  const page = parsePage(rawPage);

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const { posts, total } = await safeFetch<BlogIndexResult>(
    blogIndexQuery,
    { start, end },
    isSanityConfigured ? { posts: [], total: 0 } : demoBlogIndex(start, end)
  );

  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  // Out of range page (e.g. ?page=99 when only 1 page exists) → 404,
  // but page 1 with no posts is a valid empty state.
  if (page > 1 && page > totalPages) {
    notFound();
  }

  return (
    <>
      {/* ── HERO — a reading room, not a feed ── */}
      <section className="bg-[var(--color-surface)]">
        <Container className="py-20 text-center md:py-24">
          <Reveal>
            <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-[var(--color-accent-strong)]">
              Blog
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-serif text-4xl leading-[1.15] tracking-tight text-[var(--color-foreground)] md:text-[3.2rem]">
              Notes &amp; resources.
            </h1>
          </Reveal>
        </Container>
      </section>

      {/* ── HAVEN: one soft column, one essay at a time ── */}
      <section className="relative -mt-4 rounded-t-[3rem] bg-[var(--color-background)] py-16 md:rounded-t-[4rem] md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            {posts.length === 0 ? (
              <Reveal>
                <p className="rounded-[2rem] border border-[var(--color-subtle)]/60 bg-[var(--color-surface)] p-8 text-[var(--color-muted)]">
                  No posts yet. Once posts are published in the Studio, they
                  show up here.
                </p>
              </Reveal>
            ) : (
              <>
                <div className="space-y-8">
                  {posts.map((post, index) => (
                    <Reveal key={post._id} delay={Math.min(0.08 * index, 0.32)}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group block rounded-[2rem] border border-[var(--color-subtle)]/50 bg-[var(--color-surface)] px-8 py-9 text-center shadow-[var(--shadow-card)] transition-all duration-700 hover:border-[var(--color-accent)]/50 md:px-12"
                      >
                        {/* a small round window, not a photo demanding attention */}
                        <div className="mx-auto -mt-1 h-16 w-16 overflow-hidden rounded-full ring-4 ring-[var(--color-accent-soft)] transition-transform duration-700 group-hover:scale-105">
                          <SanityImg
                            image={post.featuredImage}
                            alt={post.featuredImage?.alt ?? post.title ?? ""}
                            width={128}
                            height={128}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
                          {post.categories?.[0]?.title ?? "Essay"}
                          {post.publishedAt
                            ? ` · ${formatDateLong(post.publishedAt)}`
                            : ""}
                        </p>
                        <h2 className="mx-auto mt-4 max-w-md text-balance font-serif text-2xl leading-[1.3] text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent-strong)] md:text-[1.8rem]">
                          {post.title}
                        </h2>
                        {post.excerpt ? (
                          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-[1.9] text-[var(--color-muted)]">
                            {post.excerpt}
                          </p>
                        ) : null}
                        <span
                          aria-hidden
                          className="mt-6 inline-block h-1.5 w-1.5 rounded-full transition-all duration-500 group-hover:w-8"
                          style={{ background: "var(--color-accent)" }}
                        />
                      </Link>
                    </Reveal>
                  ))}
                </div>
                <Reveal>
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    basePath="/blog"
                  />
                </Reveal>
              </>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
