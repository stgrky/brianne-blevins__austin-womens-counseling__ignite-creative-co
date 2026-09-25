import Link from "next/link";

import type { NavItem, SanityImageWithAlt } from "@/sanity/types";

import { Container } from "./Container";
import { NavMenu } from "./NavMenu";
import { SanityImg } from "./SanityImg";

/**
 * The fallback menu, used only when nothing is set in the Studio — so the site
 * always has navigation even if the menu document is emptied by accident.
 *
 * The blog is deliberately absent: hidden at the client's request (2026-09-23)
 * until she has posts. The route still works, so a draft can be previewed by
 * URL.
 */
const FALLBACK_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Rates & Good Faith Estimate", href: "/about#rates" },
      { label: "Notices", href: "/notices" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Supervision & Consultation", href: "/supervision" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

type Props = {
  practiceName: string;
  /** The button at the end of the menu. Editable in Site Settings. */
  cta?: { label?: string; href?: string };
  navItems?: NavItem[];
  logo?: SanityImageWithAlt;
};

export function Header({ practiceName, cta, navItems, logo }: Props) {
  const items = navItems?.length ? navItems : FALLBACK_NAV;
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-subtle)]/60 bg-[var(--color-background)]/85 backdrop-blur">
      <Container className="flex items-center justify-between gap-6 py-5">
        <Link
          href="/"
          className="flex items-center text-[var(--color-foreground)]"
          aria-label={practiceName}
        >
          {logo?.asset ? (
            <SanityImg
              image={logo}
              alt={logo.alt ?? practiceName}
              width={320}
              height={80}
              className="h-9 w-auto object-contain md:h-10"
            />
          ) : (
            <span className="font-serif text-xl tracking-tight">
              {practiceName}
            </span>
          )}
        </Link>
        <NavMenu items={items} />
        <Link
          href={cta?.href ?? "/contact"}
          className="hidden rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm text-white transition hover:bg-[var(--color-accent-strong)] md:inline-flex"
        >
          {cta?.label ?? "Book a consult"}
        </Link>
      </Container>
      <Container className="pb-3 md:hidden">
        <NavMenu items={items} />
      </Container>
    </header>
  );
}
