import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Supervision & Consultation.
 *
 * Kept separate from the About page because the people listed here are
 * supervisees, not members of the practice — the client was explicit that her
 * associates don't practise under her business, and a page that implied
 * otherwise would misrepresent both of them.
 */
export const supervisionPage = defineType({
  name: "supervisionPage",
  title: "Supervision & Consultation page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Page heading", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 4 }),
    defineField({
      name: "offerings",
      title: "What you offer",
      description: "Supervision, consultation, anything else — one block each.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "offering",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Description", type: "text", rows: 5 }),
            defineField({
              name: "detail",
              title: "Practical detail (optional)",
              description: "e.g. 'Weekly, in person or online' or a fee.",
              type: "string",
            }),
          ],
          preview: { select: { title: "title", subtitle: "detail" } },
        }),
      ],
    }),
    defineField({
      name: "superviseesHeading",
      title: "Supervisees section heading",
      type: "string",
      initialValue: "Current and former supervisees",
    }),
    defineField({
      name: "superviseesIntro",
      title: "Supervisees intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "supervisees",
      title: "Supervisees",
      description:
        'Press "Add item" to add someone, or use the ⋮ menu to remove or reorder. Add and remove people yourself any time — nothing needs to come through us.',
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "supervisee",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({
              name: "credentials",
              title: "Credentials",
              description: "e.g. 'LPC Associate'.",
              type: "string",
            }),
            defineField({ name: "bio", title: "Short bio", type: "text", rows: 4 }),
            defineField({
              name: "photo",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
            }),
          ],
          preview: { select: { title: "name", subtitle: "credentials", media: "photo" } },
        }),
      ],
    }),
    defineField({
      name: "ctaHeading",
      title: "Closing heading",
      type: "string",
    }),
    defineField({ name: "ctaBody", title: "Closing text", type: "text", rows: 3 }),
  ],
  preview: { prepare: () => ({ title: "Supervision & Consultation" }) },
});
