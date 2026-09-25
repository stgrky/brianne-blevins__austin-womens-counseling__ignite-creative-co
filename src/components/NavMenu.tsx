"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { NavItem } from "@/sanity/types";

/**
 * The menu, with dropdowns.
 *
 * Opens on hover for a mouse, on click or Enter for a keyboard, and closes on
 * Escape or on a click elsewhere — a hover-only dropdown is unreachable by
 * keyboard and unusable on a phone, which is most of this practice's traffic.
 * The parent is a real <button> with aria-expanded so a screen reader
 * announces it as something that opens.
 *
 * On small screens there is no hover to rely on, so every dropdown renders
 * expanded as an indented list: a short menu that's all visible beats a menu
 * that has to be operated.
 */
export function NavMenu({
  items,
  variant,
  cta,
}: {
  items: NavItem[];
  /** Shown as a full-width button at the bottom of the open mobile panel. */
  cta?: { label?: string; href?: string };
  /** Which layout to draw. The header places these in two different rows, so
   *  the component renders one at a time rather than both — rendering both
   *  from two call sites stacked two menus on top of each other. */
  variant: "desktop" | "mobile";
}) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // Any navigation closes whatever is open, including a click inside a dropdown.
  // Adjusted during render rather than in an effect: an effect would paint the
  // new page with the old menu still hanging open for a frame.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenLabel(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (openLabel === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenLabel(null);
    };
    const onClick = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenLabel(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openLabel]);

  const isCurrent = (href?: string) =>
    Boolean(href) && (pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)));

  if (variant === "desktop") {
    return (
      <div ref={navRef} className="hidden items-center gap-6 text-sm md:flex">
        {items.map((item) => {
          const children = item.children ?? [];
          const open = openLabel === item.label;

          if (children.length === 0) {
            return (
              <Link
                key={item.label}
                href={item.href ?? "/"}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={`transition hover:text-[var(--color-foreground)] ${
                  isCurrent(item.href)
                    ? "text-[var(--color-foreground)]"
                    : "text-[var(--color-muted)]"
                }`}
              >
                {item.label}
              </Link>
            );
          }

          return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenLabel(item.label ?? null)}
              onMouseLeave={() => setOpenLabel(null)}
            >
              <button
                type="button"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpenLabel(open ? null : (item.label ?? null))}
                className={`inline-flex items-center gap-1.5 transition hover:text-[var(--color-foreground)] ${
                  open || children.some((child) => isCurrent(child.href)) || isCurrent(item.href)
                    ? "text-[var(--color-foreground)]"
                    : "text-[var(--color-muted)]"
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`text-[10px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                >
                  ▾
                </span>
              </button>

              {open ? (
                <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                  <ul className="min-w-[15rem] overflow-hidden rounded-2xl border border-[var(--color-subtle)]/70 bg-[var(--color-surface)] py-2 shadow-[var(--shadow-card)]">
                    {item.href ? (
                      <li>
                        <Link
                          href={item.href}
                          className="block px-5 py-2.5 text-sm text-[var(--color-foreground)] transition hover:bg-[var(--color-accent-soft)]"
                        >
                          {item.label} overview
                        </Link>
                      </li>
                    ) : null}
                    {children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href ?? "/"}
                          aria-current={isCurrent(child.href) ? "page" : undefined}
                          className={`block px-5 py-2.5 text-sm transition hover:bg-[var(--color-accent-soft)] ${
                            isCurrent(child.href)
                              ? "text-[var(--color-accent-strong)]"
                              : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }

  // Mobile and tablet: an icon button beside the logo that drops a soft panel
  // across the full width of the header. The first attempt was a bare list of
  // links under the logo — legible, but it read like a sitemap rather than
  // part of this site.
  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        aria-expanded={mobileOpen}
        aria-controls="mobile-menu"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-subtle)] text-[var(--color-foreground)] transition hover:border-[var(--color-accent)]"
      >
        <span aria-hidden className="relative block h-3 w-4">
          <span
            className={`absolute left-0 block h-px w-4 bg-current transition-all duration-300 ${
              mobileOpen ? "top-1.5 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1.5 block h-px w-4 bg-current transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 block h-px w-4 bg-current transition-all duration-300 ${
              mobileOpen ? "top-1.5 -rotate-45" : "top-3"
            }`}
          />
        </span>
      </button>

      {mobileOpen ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-50 px-4 pb-4"
        >
          <div className="overflow-hidden rounded-[2rem] border border-[var(--color-subtle)]/60 bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href ?? item.children?.[0]?.href ?? "/"}
                    className={`font-serif text-xl leading-tight transition ${
                      isCurrent(item.href)
                        ? "text-[var(--color-accent-strong)]"
                        : "text-[var(--color-foreground)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {(item.children ?? []).length > 0 ? (
                    <ul className="mt-2.5 space-y-2">
                      {(item.children ?? []).map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href ?? "/"}
                            className={`block text-[15px] transition ${
                              isCurrent(child.href)
                                ? "text-[var(--color-accent-strong)]"
                                : "text-[var(--color-muted)]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>

            {cta?.label ? (
              <Link
                href={cta.href ?? "/contact"}
                className="mt-7 flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
              >
                {cta.label}
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
