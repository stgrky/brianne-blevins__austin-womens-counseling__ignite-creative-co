import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AuthorCard } from "@/components/AuthorCard";
import { Container } from "@/components/Container";
import { GuestBadge } from "@/components/GuestBadge";
import { Reveal } from "@/components/motion/Reveal";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import { PostWidget } from "@/components/PostWidget";
import { ReviewerByline } from "@/components/ReviewerByline";
import { SanityImg } from "@/components/SanityImg";
import { demoPostBySlug, demoSimilar } from "@/lib/demo-posts";
import { formatDateLong } from "@/lib/format";
import { safeFetch } from "@/sanity/client";
import { postBySlugQuery, similarPostsQuery } from "@/sanity/queries";
import type { PostDetail, RecentPost } from "@/sanity/types";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  return safeFetch<PostDetail | null>(
    postBySlugQuery,
    { slug },
    demoPostBySlug(slug)
  );
}

async function getSimilar(slug: string, categoryIds: string[]) {
  if (!categoryIds.length) return demoSimilar(slug);
  return safeFetch<RecentPost[]>(
    similarPostsQuery,
    { slug, categoryIds },
    demoSimilar(slug)
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const categoryIds = (post.categories ?? []).map((cat) => cat._id);
  const similar = await getSimilar(slug, categoryIds);

  return (
    <Container className="py-16 md:py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <article className="lg:col-span-8">
          <Reveal>
            <SanityImg
              image={post.featuredImage}
              alt={post.featuredImage?.alt ?? post.title ?? ""}
              width={1400}
              height={840}
              priority
              className="aspect-[5/3] w-full rounded-2xl object-cover shadow-[var(--shadow-card)]"
              sizes="(min-width: 1024px) 800px, 100vw"
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--color-muted)]">
                <span className="text-[var(--color-muted)]">By</span>
                <div className="flex items-center gap-2">
                  {post.author?.photo ? (
                    <SanityImg
                      image={post.author.photo}
                      alt={post.author?.name ?? ""}
                      width={32}
                      height={32}
                      className="h-7 w-7 flex-shrink-0 rounded-full object-cover"
                    />
                  ) : null}
                  {post.author?.name ? (
                    <span className="whitespace-nowrap font-medium text-[var(--color-foreground)]">
                      {post.author.name}
                    </span>
                  ) : null}
                  {post.author?.isGuestContributor ? <GuestBadge /> : null}
                </div>
                {post.publishedAt || post.updatedAt ? (
                  <time
                    dateTime={post.updatedAt ?? post.publishedAt}
                    className="whitespace-nowrap before:mr-3 before:text-[var(--color-subtle)] before:content-['|']"
                  >
                    {post.updatedAt
                      ? `Updated ${formatDateLong(post.updatedAt)}`
                      : formatDateLong(post.publishedAt!)}
                  </time>
                ) : null}
              </div>
              {post.clinicalReviewer ? (
                <ReviewerByline
                  reviewer={post.clinicalReviewer}
                  label="Clinically reviewed by"
                  showVerifiedBadge
                />
              ) : post.editor ? (
                <ReviewerByline
                  reviewer={post.editor}
                  label="Edited by"
                />
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-[var(--color-foreground)] md:text-[3rem]">
              {post.title}
            </h1>
          </Reveal>

          {post.excerpt ? (
            <Reveal delay={0.18}>
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
                {post.excerpt}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={0.24}>
            <div className="prose-serif prose-gentle mt-12 text-lg text-[var(--color-foreground)]">
              <PortableTextRenderer value={post.body} />
            </div>
          </Reveal>

          <Reveal>
            <AuthorCard author={post.author} />
          </Reveal>
        </article>
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal delay={0.2}>
              <PostWidget posts={similar} variant="related" />
            </Reveal>
          </div>
        </aside>
      </div>
    </Container>
  );
}
