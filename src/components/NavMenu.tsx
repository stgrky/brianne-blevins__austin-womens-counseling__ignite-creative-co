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
export function NavMenu({ items }: { items: NavItem[] }) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // Any navigation closes whatever is open, including a click inside a dropdown.
  // Adjusted during render rather than in an effect: an effect would paint the
  // new page with the old menu still hanging open for a frame.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenLabel(null);
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

  return (
    <>
      {/* Desktop */}
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

      {/* Mobile: everything visible, children indented under their parent */}
      <nav className="w-full md:hidden">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
          {items.map((item) => (
            <li key={item.label} className="flex flex-wrap items-center gap-x-3">
              <Link
                href={item.href ?? (item.children?.[0]?.href ?? "/")}
                className={`transition ${
                  isCurrent(item.href)
                    ? "text-[var(--color-foreground)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                }`}
              >
                {item.label}
              </Link>
              {(item.children ?? []).map((child) => (
                <Link
                  key={child.href}
                  href={child.href ?? "/"}
                  className={`text-[13px] transition ${
                    isCurrent(child.href)
                      ? "text-[var(--color-accent-strong)]"
                      : "text-[var(--color-muted)]/80 hover:text-[var(--color-foreground)]"
                  }`}
                >
                  · {child.label}
                </Link>
              ))}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
