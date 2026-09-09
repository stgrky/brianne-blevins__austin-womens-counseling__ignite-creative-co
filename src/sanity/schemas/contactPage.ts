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
    defineField({
      name: "formEmbedUrl",
      title: "Contact form link",
      type: "url",
      description:
        "Your existing Google Form, shown right on this page so visitors never leave your site. To get this link: open your form in Google Forms, click Send (top right), choose the < > tab, and copy the address inside src=\"...\". It looks like https://docs.google.com/forms/d/e/XXXX/viewform?embedded=true. Leave blank to hide the form.",
    }),
    defineField({
      name: "faqHeading",
      title: "FAQ — section heading",
      type: "string",
      description:
        "The title above your questions, e.g. \"Common questions\". Leave blank and the whole FAQ section stays hidden.",
    }),
    defineField({
      name: "faqs",
      title: "FAQ — questions",
      type: "array",
      description:
        "Questions people ask before reaching out. Press \"Add item\" for each one. Add, edit, reorder, or remove these yourself any time.",
      of: [
        {
          type: "object",
          name: "faq",
          fields: [
            {
              name: "question",
              type: "string",
              title: "Question",
              validation: (rule) => rule.required(),
            },
            {
              name: "answer",
              type: "text",
              rows: 4,
              title: "Answer",
              validation: (rule) => rule.required(),
            },
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});
