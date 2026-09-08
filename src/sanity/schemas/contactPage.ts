import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
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
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({
      name: "addressLine",
      title: "Address",
      type: "string",
      description: "Leave blank for telehealth-only practices.",
    }),
    defineField({
      name: "schedulingUrl",
      title: "Scheduling URL",
      type: "url",
      description:
        "Optional. Paste your full Calendly or Cal.com link (e.g. https://calendly.com/your-practice/consult or https://cal.com/your-practice/consult). The scheduler will embed directly on the contact page so visitors can book without leaving the site.",
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "day", type: "string", title: "Day(s)" },
            { name: "time", type: "string", title: "Time" },
          ],
          preview: { select: { title: "day", subtitle: "time" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});
