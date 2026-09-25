import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The Notices page: licensure, complaints, and records requests.
 *
 * Texas requires a practitioner to publish how to verify a license, how to
 * file a complaint, and how to request records (Tex. Health & Safety Code
 * §181.105), and the other states a telehealth provider is licensed in expect
 * the same verification path. This is the one page that collects all of it, so
 * the required language is findable rather than scattered.
 *
 * Editable rather than hardcoded, because licence numbers renew, boards move
 * their verification pages, and a practice adds states over time.
 */
export const noticesPage = defineType({
  name: "noticesPage",
  title: "Notices page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Page heading",
      type: "string",
      initialValue: "Notices",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "licensureHeading",
      title: "Licensure section heading",
      type: "string",
      initialValue: "Licensure & verification",
    }),
    defineField({
      name: "licensureIntro",
      title: "Licensure intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "licensure",
      title: "Licences",
      description:
        "One row per state you're licensed in. The verification link should point at that state's board, so anyone can confirm the licence themselves.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "licence",
          fields: [
            defineField({ name: "state", title: "State", type: "string" }),
            defineField({
              name: "credential",
              title: "Credential",
              description: "e.g. 'LMFT-S' or 'LPC-S'.",
              type: "string",
            }),
            defineField({
              name: "licenseNumber",
              title: "Licence number",
              description: "Leave blank if you'd rather not publish it.",
              type: "string",
            }),
            defineField({
              name: "boardName",
              title: "Licensing board",
              type: "string",
            }),
            defineField({
              name: "verifyUrl",
              title: "Verification link",
              description: "The board's public licence lookup.",
              type: "url",
            }),
          ],
          preview: {
            select: { title: "state", subtitle: "credential" },
          },
        }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Other notices",
      description:
        "Complaints, records requests, and anything else your boards require. Each one becomes a titled block on the page.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "notice",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 6 }),
            defineField({
              name: "linkLabel",
              title: "Link label (optional)",
              type: "string",
            }),
            defineField({ name: "linkUrl", title: "Link (optional)", type: "url" }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Notices page" }),
  },
});
