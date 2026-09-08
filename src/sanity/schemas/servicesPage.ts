import { defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
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
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          name: "service",
          title: "Service",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
            },
            {
              name: "icon",
              title: "Icon (emoji or short symbol)",
              type: "string",
              description: "Optional. e.g. 💬, 🤝, 🌿",
            },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Services Page" }) },
});
