import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The site menu, editable rather than coded.
 *
 * Added when the practice outgrew a flat menu (2026-09: five pages became
 * nine). A page with children becomes a dropdown; a page without stays a plain
 * link. Leaving the whole list empty falls back to the built-in menu, so the
 * site can never end up with no navigation at all.
 */
export const navigation = defineType({
  name: "navigation",
  title: "Menu",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Menu items",
      description:
        'Top-level items appear across the menu bar. Add items underneath one to turn it into a dropdown. Links are page addresses like "/about", or a full https:// address for another site.',
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "item",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link",
              description:
                'Where it goes, e.g. "/about". Leave blank on a parent that only opens a dropdown.',
              type: "string",
            }),
            defineField({
              name: "children",
              title: "Dropdown items",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "childItem",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "href",
                      title: "Link",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: { select: { title: "label", subtitle: "href" } },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href", children: "children" },
            prepare({ title, subtitle, children }) {
              const count = Array.isArray(children) ? children.length : 0;
              return {
                title,
                subtitle: count > 0 ? `${subtitle ?? ""} · ${count} in dropdown` : subtitle,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Menu" }) },
});
