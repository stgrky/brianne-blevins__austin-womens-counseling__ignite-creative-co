import type { SchemaTypeDefinition } from "sanity";

import { aboutPage } from "./aboutPage";
import { announcement } from "./announcement";
import { author } from "./author";
import { blockContent } from "./blockContent";
import { category } from "./category";
import { consultationPage } from "./consultationPage";
import { contactPage } from "./contactPage";
import { formsPage } from "./formsPage";
import { homePage } from "./homePage";
import { navigation } from "./navigation";
import { noticesPage } from "./noticesPage";
import { post } from "./post";
import { servicesPage } from "./servicesPage";
import { siteSettings } from "./siteSettings";
import { supervisionPage } from "./supervisionPage";
import { testimonial } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContent,
  author,
  category,
  post,
  testimonial,
  announcement,
  siteSettings,
  homePage,
  aboutPage,
  servicesPage,
  contactPage,
  noticesPage,
  supervisionPage,
  consultationPage,
  formsPage,
  navigation,
];

export const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "aboutPage",
  "servicesPage",
  "contactPage",
  "noticesPage",
  "supervisionPage",
  "consultationPage",
  "formsPage",
  "navigation",
  "announcement",
]);
