import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Consultation, split out from the Supervision page.
 *
 * Her words, 2026-10-05: her current site keeps these on two separate pages,
 * and "side by side I am thinking it will be too much info side by side
 * together". They also speak to different people. Supervision is for
 * associates working toward licensure; consultation is for clinicians who are
 * already licensed. One page asking a reader to work out which half applies to
 * them serves neither.
 *
 * The supervisee roster stays with Supervision, because those are the people
 * she supervises.
 *
 * `body` is rich text rather than a plain box because she said she has more to
 * carry across from the old site and wanted room for it.
 */
export const consultationPage = defineType({
  name: "consultationPage",
  title: "Consultation page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Page heading",
      type: "string",
      initialValue: "Consultation",
    }),
    defineField({
      name: "eyebrow",
      title: "Small line above the heading",
      description: 'Who the page is for, e.g. "For licensed clinicians".',
      type: "string",
      initialValue: "For licensed clinicians",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      description: "A sentence or two under the heading.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "areas",
      title: "What you consult on",
      description:
        'One card per area, the same way the Supervision page lists what you offer. Press "Add item" for another, and use the ⋮ menu to remove or reorder one. Leave it empty and this section stays hidden.',
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "area",
          fields: [
            defineField({
              name: "title",
              title: "Area",
              description: 'e.g. "Perinatal mental health" or "Case consultation".',
              type: "string",
            }),
            defineField({
              name: "detail",
              title: "Short line underneath (optional)",
              description: 'e.g. "For clinicians new to this population".',
              type: "string",
            }),
            defineField({ name: "body", title: "Description", type: "text", rows: 5 }),
          ],
          preview: { select: { title: "title", subtitle: "detail" } },
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "The rest of the page",
      description:
        "Everything else you want to say about consultation. Use the toolbar for bold, headings and links.",
      type: "blockContent",
    }),
    defineField({
      name: "ctaHeading",
      title: "Closing heading",
      type: "string",
      initialValue: "Looking for consultation?",
    }),
    defineField({
      name: "ctaBody",
      title: "Closing text",
      type: "text",
      rows: 3,
    }),
  ],
  preview: { prepare: () => ({ title: "Consultation" }) },
});
