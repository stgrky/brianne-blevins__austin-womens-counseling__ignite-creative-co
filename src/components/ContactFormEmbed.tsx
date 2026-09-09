"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  url: string;
};

/**
 * Ensure the embed parameter is present. A client pasting the normal
 * "share" link (…/viewform) gets Google's full page chrome inside the
 * frame; adding embedded=true strips it down to just the form.
 */
function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.endsWith("docs.google.com")) {
      u.searchParams.set("embedded", "true");
    }
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * Inline embed of the practice's own existing form (Google Forms here).
 *
 * Deliberately *their* form, not one ICC builds: submissions go straight to
 * the system they already use, so no inquiry data — which for a therapy
 * practice can arrive carrying PHI — ever routes through ICC. See the CSA's
 * §5.5/§5.6 for why that separation matters.
 *
 * Height can't be measured cross-origin, so it's fixed and generous, with
 * the form scrolling inside its own frame if it runs long.
 */
export function ContactFormEmbed({ url }: Props) {
  const embedUrl = useMemo(() => toEmbedUrl(url), [url]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [embedUrl]);

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-[var(--color-subtle)]/60 bg-white shadow-[var(--shadow-card)]">
      <div
        aria-hidden={loaded}
        className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        style={{ background: "var(--color-accent-soft)" }}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-current border-r-transparent"
            style={{ color: "var(--color-accent-strong)" }}
          />
          <p className="text-sm text-[var(--color-accent-strong)]">
            Loading the form…
          </p>
        </div>
      </div>

      <iframe
        title="Contact form"
        src={embedUrl}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="block h-[1100px] w-full border-0 md:h-[900px]"
      />
    </div>
  );
}
