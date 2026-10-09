import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The Client Forms page.
 *
 * These are onboarding paperwork, not a way in. The practitioner's own words
 * (2026-10-07): "I've had people I've never met send all their info and then
 * never become clients, which can make it weird." So the page says plainly,
 * before anything else, that these are for after the consultation.
 *
 * The forms themselves live with Paubox, which holds the BAA and is built to
 * receive clinical detail. This page only links out to them. Nothing a client
 * types is ever submitted to, or stored on, this website.
 *
 * Editable because the set of forms changes, and because a link that has moved
 * should not need a developer.
 */
export const formsPage = defineType({
  name: "formsPage",
  title: "Client Forms page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Page heading",
      type: "string",
      initialValue: "Client forms",
    }),
    defineField({
      name: "notice",
      title: "Notice at the top",
      description:
        "Shown in a highlighted box above the forms, so nobody fills one in before meeting you.",
      type: "string",
      initialValue: "Please complete these after your consultation.",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      description: "A sentence or two under the heading. Optional.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "forms",
      title: "Forms",
      description:
        'One row per form. Press "Add item" to add another, and use the ⋮ menu to remove or reorder one.',
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "clientForm",
          fields: [
            defineField({
              name: "title",
              title: "Form name",
              description: 'What the client sees, e.g. "Intake paperwork".',
              type: "string",
            }),
            defineField({
              name: "description",
              title: "What it is (optional)",
              description: "A line explaining what the form covers, or how long it takes.",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "url",
              title: "Link to the form",
              description: "The Paubox link. Opens in a new tab.",
              type: "url",
            }),
          ],
          preview: { select: { title: "title", subtitle: "url" } },
        }),
      ],
    }),
    defineField({
      name: "footnote",
      title: "Closing note (optional)",
      description: "Anything to add under the list, e.g. who to contact with a problem.",
      type: "text",
      rows: 3,
    }),
  ],
  preview: { prepare: () => ({ title: "Client Forms" }) },
});
