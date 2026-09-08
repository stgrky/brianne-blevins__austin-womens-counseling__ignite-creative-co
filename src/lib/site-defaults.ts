import type {
  AboutPage,
  Announcement,
  ContactPage,
  HomePage,
  PostListItem,
  RecentPost,
  ServicesPage,
  SiteSettings,
  Testimonial,
} from "@/sanity/types";

/**
 * HAVEN — Soft & Wellness.
 * Demo persona: Stillwater Somatic Therapy / Imani Brooks, LMFT (fictional) —
 * trauma-informed, somatic, mindfulness-oriented. Lavender/dusty-blue palette,
 * lightweight Marcellus type, and a voice like a slow exhale. Every design
 * choice aims at one thing: lowering an anxious visitor's guard.
 */

export const defaultSiteSettings: SiteSettings = {
  practiceName: "Stillwater Somatic Therapy",
  tagline:
    "Trauma-informed, body-based therapy — a softer way back to yourself.",
  palette: "lavender",
  fontPairing: "marcellus",
  email: "hello@example.com",
  phone: "(555) 618-2247",
  addressLine: "The Garden Studio, 1204 W 12th St, Austin, TX",
  socialLinks: [],
  footerText:
    "Imani Brooks, LMFT (TX #204815). Trauma-informed somatic therapy. This site is informational and not a substitute for care. In crisis? Call or text 988 — someone is there, right now.",
  stickyCta: { label: "Reach out when you're ready", href: "/contact" },
};

export const defaultHomePage: HomePage = {
  heroEyebrow: "You made it here. That counts.",
  heroHeading: "A softer way back to yourself.",
  heroSubhead:
    "I'm Imani — a trauma-informed somatic therapist. We work with the body, not against it: slowly, at your pace, with the door always in view. Nothing here needs to be forced, rushed, or performed.",
  heroImage: {
    demoUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=288&h=288&fit=crop&q=80",
    alt: "Imani Brooks, LMFT",
  },
  primaryCta: { label: "Reach out when you're ready", href: "/contact" },
  secondaryCta: { label: "See how sessions feel", href: "/services" },
  whatToExpectHeading: "What the first steps feel like.",
  whatToExpectIntro:
    "Not knowing what happens next is its own kind of stress. So here it is, plainly — you stay in charge of the pace the whole way.",
  whatToExpectSteps: [
    {
      icon: "🕊️",
      title: "A gentle hello.",
      body:
        "You send a note — a sentence is plenty. I reply within two days with a few times for a short call. No forms, no intake packet, not yet.",
    },
    {
      icon: "🌾",
      title: "A slow first conversation.",
      body:
        "Twenty unhurried minutes. You share only what you want to. You can ask me anything — including 'is this even for me?' Ambivalence is welcome here.",
    },
    {
      icon: "🌙",
      title: "Sessions that follow your body.",
      body:
        "We begin where you are. Some weeks that's words; some weeks it's breath, grounding, and noticing. There is no falling behind — there's only your pace.",
    },
  ],
  aboutTeaserHeading: "About Imani",
  aboutTeaserBody:
    "I'm a licensed marriage and family therapist trained in Somatic Experiencing, EMDR, and parts work. I believe healing isn't something done to you — it's something your body already knows how to do, given enough safety and enough time. My job is to help you build both.",
  aboutTeaserImage: {
    demoUrl:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&h=1400&fit=crop&q=80",
    alt: "A soft, calm room with natural light",
  },
  pricingHeading: "Plain numbers, no surprises.",
  pricingIntro:
    "Money stress has no place in a healing space. Here's everything up front.",
  sessionFee: "$160 per 55-minute session",
  insuranceNote:
    "Out-of-network, with monthly superbills for reimbursement — many PPO plans return 40–80%. I'll help you check before we ever schedule.",
  slidingScaleNote:
    "Several sliding-scale places are always held open. If the number above made your chest tighten, please still reach out.",
  showModalityDrift: true,
  modalities: [
    "Somatic Experiencing",
    "EMDR",
    "Parts work",
    "Breathwork",
    "Nervous-system care",
    "Trauma-sensitive mindfulness",
  ],
  showBreathingCircle: true,
  showCalmBand: true,
};

export const defaultTestimonials: Testimonial[] = [
  {
    _id: "default-1",
    quote:
      "For the first time, a therapist didn't ask me to retell everything. We started with my breath and my shoulders, and somehow that unlocked more than years of talking.",
    attribution: "R.",
    context: "Somatic work · 8 months",
    displayOrder: 1,
  },
  {
    _id: "default-2",
    quote:
      "Imani never once rushed me. I set the pace for the whole thing — and it turns out slow is what my nervous system needed to finally let go.",
    attribution: "T., 38",
    context: "Trauma recovery",
    displayOrder: 2,
  },
  {
    _id: "default-3",
    quote:
      "The room feels like an exhale. I didn't know a therapy session could feel physically safe like that.",
    attribution: "A client",
    context: "EMDR + parts work",
    displayOrder: 3,
  },
];

export const defaultAboutPage: AboutPage = {
  heading: "About Imani",
  intro:
    "I'm Imani Brooks, a licensed marriage and family therapist practicing body-based, trauma-informed care in Austin. Before this work I spent years watching talk-only therapy skip the place trauma actually lives — the nervous system. Training in Somatic Experiencing changed how I practice entirely: sessions that move at the body's speed, honor its defenses, and treat safety as the method, not the reward.",
  portrait: {
    demoUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1000&h=1200&fit=crop&q=80",
    alt: "Imani Brooks, LMFT",
  },
  body: [],
  credentials: [
    "M.A., Counseling Psychology",
    "Licensed Marriage & Family Therapist (TX)",
    "Somatic Experiencing Practitioner (SEP)",
    "EMDR trained (EMDRIA-approved)",
    "Internal Family Systems (IFS), Level 1",
    "Certified in trauma-sensitive mindfulness",
  ],
};

export const defaultServicesPage: ServicesPage = {
  heading: "Ways we can work",
  intro:
    "Every modality below is an invitation, not a prescription. We'll find the doorway that feels safest to you — and your no is always honored.",
  services: [
    {
      title: "Somatic therapy",
      description:
        "Body-first sessions using Somatic Experiencing — tracking sensation, releasing held survival energy, and rebuilding a felt sense of safety from the inside.",
      icon: "🌊",
    },
    {
      title: "EMDR",
      description:
        "A structured, well-researched way to help the brain reprocess stuck memories — carefully paced, with grounding built in before, during, and after.",
      icon: "🌿",
    },
    {
      title: "Parts work (IFS)",
      description:
        "Gentle work with the protective parts of you — the inner critic, the pleaser, the one who goes numb — until they can finally soften.",
      icon: "🕯️",
    },
  ],
};

export const defaultContactPage: ContactPage = {
  heading: "Whenever you're ready",
  intro:
    "There's no wrong way to start. A sentence is enough — 'I think I need support' opens every door here. I reply within two days, always personally.",
  email: "hello@example.com",
  phone: "(555) 618-2247",
  addressLine: "The Garden Studio, 1204 W 12th St, Austin, TX",
  hours: [
    { day: "Tue – Fri", time: "10:00 am – 6:00 pm" },
    { day: "Sat", time: "By arrangement" },
  ],
};

// Demo blog content (5 gentle reads) — see src/lib/demo-posts.ts
export { demoPostList as defaultPosts, demoRecentPosts as defaultRecentPosts } from "./demo-posts";

export const defaultAnnouncement: Announcement = {
  enabled: false,
  message: "",
  variant: "info",
};
