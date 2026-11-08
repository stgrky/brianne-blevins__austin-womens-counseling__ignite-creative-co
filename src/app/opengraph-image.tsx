import { readFile } from "node:fs/promises";

import { ImageResponse } from "next/og";

import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import type { SiteSettings } from "@/sanity/types";

/**
 * The social share card.
 *
 * When she pasted her address into a Facebook group the preview came back
 * empty, because the site emitted no `og:image` at all — nothing for the
 * scraper to show. This route is that image.
 *
 * Why the logo is composited onto a ground rather than used directly as the
 * `og:image`: her logo is a transparent PNG whose wordmark is black. Pointed
 * at straight, it renders on whatever each platform puts behind transparency
 * — which on LinkedIn and iMessage in dark mode is near-black, and the
 * practice name vanishes. Drawing it onto her own pale teal here means the
 * card looks the same everywhere, light mode or dark.
 *
 * 1200x630 is the size every platform crops from. Content is kept inside a
 * centre band so the tighter crops (Twitter's 2:1, iMessage's square-ish
 * tile) still contain the whole logo.
 */
export const alt = "Austin Women's Counseling";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Her palette, `softteal` in globals.css. Written out rather than imported
// because this renders through Satori, which has no CSS custom properties.
const BACKGROUND = "#f8fafa";
const WASH = "#e8f1f4";
const ACCENT = "#35788c";
const MUTED = "#5f6e73";

const FALLBACK_NAME = "Austin Women's Counseling";
const FALLBACK_TAGLINE =
  "Compassionate Counseling for Women, Caregivers & Families";

type Branding = { practiceName: string; tagline: string; logo: string | null };

/**
 * Revalidating hourly rather than reading live: a scraper waiting on a Sanity
 * round trip is the slow path, and a slow card is a missing card. An hour is
 * close enough that a logo swapped in Studio appears without a deploy.
 */
async function loadBranding(): Promise<Branding> {
  const fallback: Branding = {
    practiceName: FALLBACK_NAME,
    tagline: FALLBACK_TAGLINE,
    logo: null,
  };

  if (!sanityClient) return fallback;

  try {
    const settings = await sanityClient.fetch<SiteSettings | null>(
      `*[_type == "siteSettings"][0]{ practiceName, tagline, logo }`,
      {},
      { next: { revalidate: 3600 } }
    );
    if (!settings) return fallback;

    // `fit("max")` so a logo of any shape is contained rather than cropped —
    // the crop bug that trimmed the header logo on a sister build.
    const logo =
      urlFor(settings.logo)?.width(1200).fit("max").format("png").url() ?? null;

    return {
      practiceName: settings.practiceName ?? FALLBACK_NAME,
      tagline: settings.tagline ?? FALLBACK_TAGLINE,
      logo,
    };
  } catch {
    // A card carrying her name beats a 500, which the scraper shows as the
    // same blank box she wrote in about.
    return fallback;
  }
}

export default async function OpengraphImage() {
  const [{ practiceName, tagline, logo }, marcellus] = await Promise.all([
    loadBranding(),
    // Satori cannot use the webfonts `next/font` loads for the site, so the
    // display face is read from disk. `new URL(..., import.meta.url)` rather
    // than a `process.cwd()` join: it is the form Next's file tracing follows,
    // so the .ttf is actually bundled into the deployed function.
    readFile(new URL("./_og-fonts/Marcellus-Regular.ttf", import.meta.url)),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "72px 90px",
          backgroundColor: BACKGROUND,
          backgroundImage: `linear-gradient(170deg, ${BACKGROUND} 0%, ${WASH} 100%)`,
        }}
      >
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            alt=""
            width={620}
            height={377}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              fontFamily: "Marcellus",
              fontSize: 68,
              color: "#1f2a2e",
              textAlign: "center",
            }}
          >
            {practiceName}
          </div>
        )}

        <div
          style={{
            width: 72,
            height: 2,
            marginTop: 40,
            backgroundColor: ACCENT,
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontFamily: "Marcellus",
            fontSize: 32,
            letterSpacing: "0.01em",
            color: MUTED,
            textAlign: "center",
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Marcellus",
          data: marcellus,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
