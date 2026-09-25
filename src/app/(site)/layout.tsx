import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { StickyCta } from "@/components/site/StickyCta";
import { defaultAnnouncement, defaultSiteSettings } from "@/lib/site-defaults";
import { safeFetch } from "@/sanity/client";
import { announcementQuery, navigationQuery, siteSettingsQuery } from "@/sanity/queries";
import type { Announcement, Navigation, SiteSettings } from "@/sanity/types";

// Render every request fresh against Sanity so content edits in Studio
// (publish/edit/delete) reflect on the live site immediately. The therapist
// who owns this site should never need a developer to push an update.
export const dynamic = "force-dynamic";

async function getSiteSettings(): Promise<SiteSettings> {
  return safeFetch<SiteSettings>(siteSettingsQuery, {}, defaultSiteSettings);
}

async function getAnnouncement(): Promise<Announcement> {
  return safeFetch<Announcement>(announcementQuery, {}, defaultAnnouncement);
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, announcement, navigation] = await Promise.all([
    getSiteSettings(),
    getAnnouncement(),
    // Null fallback on purpose: no menu document yet means the Header's own
    // fallback menu renders, rather than an error page over a missing menu.
    safeFetch<Navigation | null>(navigationQuery, {}, null),
  ]);
  return (
    <>
      {/* Cursor flourishes are opt-in per template, never default. */}
      <SmoothScroll />
      <AnnouncementBar announcement={announcement} />
      <Header
        practiceName={settings.practiceName ?? "Therapy Practice"}
        navItems={navigation?.items}
        logo={settings.logo}
      />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <StickyCta
        label={settings.stickyCta?.label}
        href={settings.stickyCta?.href}
      />
    </>
  );
}
