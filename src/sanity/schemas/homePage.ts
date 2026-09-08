import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    // ── Hero ─────────────────────────────────────────────
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      description:
        "Small label above the headline (e.g. 'Therapy in Austin' or 'Now accepting new clients'). Optional.",
      type: "string",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubhead",
      title: "Hero subhead",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "object",
      fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "href", type: "string", title: "Link" },
      ],
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "object",
      fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "href", type: "string", title: "Link" },
      ],
    }),

    // ── What to expect ───────────────────────────────────
    defineField({
      name: "whatToExpectHeading",
      title: "What to expect — heading",
      type: "string",
    }),
    defineField({
      name: "whatToExpectIntro",
      title: "What to expect — intro",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "whatToExpectSteps",
      title: "What to expect — steps",
      description:
        "Three short cards walking a prospective client through what happens. Keep each body to a sentence or two.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "body", type: "text", rows: 3, title: "Body" },
            {
              name: "icon",
              type: "string",
              title: "Icon (emoji)",
              description: "A single emoji or short symbol.",
            },
          ],
          preview: {
            select: { title: "title", subtitle: "body" },
          },
        },
      ],
      validation: (rule) => rule.max(4),
    }),

    // ── About teaser ─────────────────────────────────────
    defineField({
      name: "aboutTeaserHeading",
      title: "About teaser heading",
      type: "string",
    }),
    defineField({
      name: "aboutTeaserBody",
      title: "About teaser body",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "aboutTeaserImage",
      title: "About teaser image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),

    // ── Pricing & insurance ──────────────────────────────
    defineField({
      name: "pricingHeading",
      title: "Pricing & insurance — heading",
      type: "string",
    }),
    defineField({
      name: "pricingIntro",
      title: "Pricing & insurance — intro",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "sessionFee",
      title: "Session fee",
      description: "e.g. '$175 per 50-min session'",
      type: "string",
    }),
    defineField({
      name: "insuranceNote",
      title: "Insurance note",
      description:
        "A sentence or two on insurance accepted, out-of-network reimbursement, etc.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "slidingScaleNote",
      title: "Sliding scale note",
      description: "A short statement about sliding scale availability.",
      type: "text",
      rows: 2,
    }),

    // ── Modality drift ribbon ────────────────────────────
    defineField({
      name: "showModalityDrift",
      title: "Show the modalities ribbon",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "modalities",
      title: "Modalities (drifting ribbon)",
      type: "array",
      of: [{ type: "string" }],
    }),

    // ── Decorative section toggles ───────────────────────
    defineField({
      name: "showBreathingCircle",
      title: "Show the breathing-circle section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showCalmBand",
      title: "Show the calm-band statement",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
