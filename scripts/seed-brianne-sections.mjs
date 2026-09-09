/**
 * One-off: seed the three sections added for this build (associates, FAQ,
 * contact-form embed) with starter content, and wire in the practice's real
 * Google Form.
 *
 * The associates and FAQ sections hide themselves when empty — which would
 * mean the client never discovers they exist. Starter rows make them visible
 * and self-explanatory in the Studio, exactly like the rest of the seeded
 * template content she's replacing.
 *
 * Run once: node --env-file=.env.local scripts/seed-brianne-sections.mjs
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScmGuT3TmWkC-qwjuerBdfGy1e5FRPtmOY70Mocdg0cEdhr0Q/viewform?embedded=true";

const associates = [
  {
    _key: "assoc1",
    _type: "associate",
    name: "Add your first associate",
    credentials: "LPC Associate",
    bio: "Replace this with their bio. Press the ⋮ menu on this card to delete it once you've added your own, or use \"Add item\" below to add more people.",
  },
  {
    _key: "assoc2",
    _type: "associate",
    name: "And a second, if you have one",
    credentials: "LMFT Associate",
    bio: "Each person gets their own card with a headshot, credentials, and bio. Reorder them by dragging.",
  },
];

const faqs = [
  {
    _key: "faq1",
    _type: "faq",
    question: "Do you take insurance?",
    answer:
      "Replace this with your own answer. This practice is not in-network at this time, but a superbill is available on request for out-of-network reimbursement.",
  },
  {
    _key: "faq2",
    _type: "faq",
    question: "Which states are you licensed in?",
    answer:
      "Texas, Florida, Idaho, and South Carolina — most sessions are held over secure telehealth.",
  },
  {
    _key: "faq3",
    _type: "faq",
    question: "What happens in a free consultation?",
    answer:
      "A brief phone call to talk through what you're looking for and whether we're a good fit — no cost and no obligation.",
  },
];

const patches = [
  client
    .patch("aboutPage")
    .set({
      associatesHeading: "Associates",
      associatesIntro:
        "Replace this intro with your own — or clear the heading above to hide this whole section.",
      associates,
    })
    .commit(),
  client
    .patch("contactPage")
    .set({
      formEmbedUrl: FORM_URL,
      faqHeading: "Questions people ask first",
      faqs,
    })
    .commit(),
];

await Promise.all(patches);
console.log("✓ Seeded associates, FAQ, and contact-form embed.");
