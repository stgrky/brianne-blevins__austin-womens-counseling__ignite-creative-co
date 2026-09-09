import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
      description: "Short summary shown above the main body.",
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [{ type: "string" }],
      description: "Degrees, licenses, certifications.",
    }),
    defineField({
      name: "associatesHeading",
      title: "Associates — section heading",
      type: "string",
      description:
        "The title above your associates list, e.g. \"Associates\" or \"Who you might work with\". Leave this blank and the whole section stays hidden.",
    }),
    defineField({
      name: "associatesIntro",
      title: "Associates — intro",
      type: "text",
      rows: 2,
      description: "Optional sentence or two above the list.",
    }),
    defineField({
      name: "associates",
      title: "Associates",
      type: "array",
      description:
        "Everyone listed here appears on your About page. Press \"Add item\" to add someone new, or use the ⋮ menu on an entry to remove or reorder. Add and remove people yourself any time — nothing needs to come through us.",
      of: [
        {
          type: "object",
          name: "associate",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Name",
              validation: (rule) => rule.required(),
            },
            {
              name: "credentials",
              type: "string",
              title: "Credentials",
              description: "Shown under the name, e.g. \"LPC Associate\".",
            },
            {
              name: "photo",
              type: "image",
              title: "Headshot",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Alt text" }],
            },
            {
              name: "bio",
              type: "text",
              rows: 4,
              title: "Bio",
            },
          ],
          preview: {
            select: { title: "name", subtitle: "credentials", media: "photo" },
          },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
