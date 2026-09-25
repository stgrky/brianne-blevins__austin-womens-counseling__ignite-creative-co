import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { defaultContactPage, defaultSiteSettings } from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import { contactPageQuery, siteSettingsQuery } from "@/sanity/queries";
import type { ContactPage, SiteSettings } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Privacy & cookies",
  description: "How this website handles the information you share through it, and what it stores on your device.",
  alternates: { canonical: "/privacy" },
};

const PRACTICE = "Austin Women's Counseling";
const UPDATED = "September 24, 2026";

/**
 * Website privacy and cookie notice.
 *
 * Describes only what this site actually does, so it can't drift into fiction:
 *   - the contact form is an embedded Google Form, so submissions go to Google
 *     and Google's cookies apply inside that embed — the one real cookie story
 *     on this site, and the thing the client asked about,
 *   - hosting (Vercel) keeps ordinary server logs,
 *   - content lives in Sanity, which holds no visitor data,
 *   - there is NO analytics on this site today. If one is ever added, this page
 *     must be updated in the same change.
 */
export default async function PrivacyPage() {
  const [settings, contact] = await Promise.all([
    safeFetch<SiteSettings>(siteSettingsQuery, {}, defaultSiteSettings),
    safeFetch<ContactPage>(contactPageQuery, {}, defaultContactPage),
  ]);
  const usesEmbeddedForm = Boolean(contact.formEmbedUrl);

  return (
    <section className="bg-[var(--color-background)] py-20 md:py-28">
      <Container>
        <article className="prose-serif mx-auto max-w-2xl text-[var(--color-foreground)]">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
            Privacy &amp; cookies
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight md:text-[3rem]">
            How this website handles your information
          </h1>
          <p className="text-sm text-[var(--color-muted)]">Last updated {UPDATED}</p>

          <p className="mt-8 leading-relaxed text-[var(--color-muted)]">
            This notice covers this website, run by {settings.practiceName ?? PRACTICE}. It explains
            what happens to information you share here. It does not describe how health information
            is handled inside therapy itself — that is covered separately by the Notice of Privacy
            Practices you receive as a client.
          </p>

          <h2 className="mt-10 font-serif text-2xl">Browsing this site</h2>
          <p className="leading-relaxed text-[var(--color-muted)]">
            You can read every page here without telling us who you are. The site does not use
            analytics, advertising trackers, or any cookies of its own.
          </p>
          <p className="leading-relaxed text-[var(--color-muted)]">
            The company that hosts this site keeps standard server records of requests, including IP
            addresses, as almost every website does. Those records exist to keep the site running
            and secure, and are not used to build a profile of you.
          </p>

          {usesEmbeddedForm ? (
            <>
              <h2 className="mt-10 font-serif text-2xl">The contact form</h2>
              <p className="leading-relaxed text-[var(--color-muted)]">
                The form on the contact page is a Google Form, shown inside this page. When you
                submit it, your answers go to Google and then to {PRACTICE} — they are not stored on
                this website. Google&rsquo;s own privacy terms and cookies apply within that form,
                including cookies Google may set while you use it.
              </p>
              <p className="leading-relaxed text-[var(--color-muted)]">
                Please share only what you need to in order to get in touch. A first message is a
                good place for your name, how to reach you, and a sentence about what you&rsquo;re
                looking for — not your full history.
              </p>
            </>
          ) : null}

          <h2 className="mt-10 font-serif text-2xl">Cookies</h2>
          <p className="leading-relaxed text-[var(--color-muted)]">
            This site sets no cookies of its own, which is why you aren&rsquo;t asked to accept any.
            The only cookies you may encounter here come from the embedded Google Form described
            above. You can block or delete cookies in your browser settings at any time; the pages
            here will still work.
          </p>

          <h2 className="mt-10 font-serif text-2xl">What we never do</h2>
          <p className="leading-relaxed text-[var(--color-muted)]">
            Information you send through this site is never sold, rented, or shared for advertising.
          </p>

          <h2 className="mt-10 font-serif text-2xl">Questions</h2>
          <p className="leading-relaxed text-[var(--color-muted)]">
            If you&rsquo;d like to know what information we hold about you, or want it deleted, get
            in touch through the contact page and we&rsquo;ll take care of it.
          </p>
          <p className="leading-relaxed text-[var(--color-muted)]">
            If this site changes — for example if analytics are added later — this page is updated
            at the same time.
          </p>
        </article>
      </Container>
    </section>
  );
}
