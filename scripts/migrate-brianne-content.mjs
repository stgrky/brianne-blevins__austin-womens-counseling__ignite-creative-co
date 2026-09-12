/**
 * One-off content migration: austinwomenscounseling.com (Google Sites) → this site.
 *
 * Every string below is Brianne's own copy, lifted verbatim from her live site.
 * Nothing here is written for her. Where the template had a field her site has
 * no equivalent for, the section is switched off rather than filled with
 * invented copy or left showing the Haven demo persona.
 *
 * Also deletes the seeded demo content (Imani Brooks' testimonials, posts,
 * author, categories) — leaving fabricated clinical content and fake client
 * testimonials under a real licensed therapist's name is the worst outcome here.
 *
 * Run once: node --env-file=.env.local scripts/migrate-brianne-content.mjs
 */
import { readFileSync } from "node:fs";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const IMG_DIR =
  "/private/tmp/claude-501/-Users-sgrantkyle-sgk-personal-blog-personal-blog--claude-worktrees-gallant-nash-7eb463/637d8cb9-7495-4fc2-919c-4726bf98a810/scratchpad/brianne-imgs";

const CONSULT_URL = "https://calendar.app.google/Wi765179JYrScYTa8";

async function upload(file, filename) {
  const asset = await client.assets.upload("image", readFileSync(`${IMG_DIR}/${file}`), {
    filename,
  });
  return asset._id;
}

const imageRef = (id, alt, hotspot) => ({
  _type: "image",
  asset: { _type: "reference", _ref: id },
  alt,
  ...(hotspot
    ? {
        hotspot: { _type: "sanity.imageHotspot", ...hotspot },
        crop: { _type: "sanity.imageCrop", top: 0, bottom: 0, left: 0, right: 0 },
      }
    : {}),
});

const para = (key, text) => ({
  _type: "block",
  _key: key,
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
});

console.log("→ uploading her images");
const portraitId = await upload("img5.bin", "brianne-blevins.jpg");
const psiBadgeId = await upload("img6.bin", "psi-pmh-c-badge.jpg");

// Her headshot is a landscape crop; bias the focal point up toward her face so
// the portrait and circular crops don't cut her off.
const portrait = imageRef(portraitId, "Brianne Blevins, LMFT-S, LPC-S, PMH-C", {
  x: 0.5,
  y: 0.38,
  width: 1,
  height: 1,
});

console.log("→ patching site settings");
await client
  .patch("siteSettings")
  .set({
    practiceName: "Austin Women's Counseling",
    tagline: "Compassionate Counseling for Women, Caregivers & Families",
    footerText:
      "Brianne Blevins, LMFT-S, LPC-S, PMH-C · Austin Women's Counseling. This site is informational and not a substitute for care. In crisis? Call or text 988.",
    stickyCta: { label: "Free 15-minute consultation", href: CONSULT_URL },
  })
  // She publishes no email, phone, or office address — everything routes
  // through her own form. The demo values here were fabricated.
  .unset(["email", "phone", "addressLine", "logo"])
  .commit();

console.log("→ patching home page");
await client
  .patch("homePage")
  .set({
    heroEyebrow: "Welcome to Austin Women's Counseling.",
    heroHeading: "Compassionate Counseling for Women, Caregivers & Families",
    heroSubhead:
      "Compassionate online counseling for anxiety, trauma, perinatal mental health, postpartum support, caregiver burnout, and personal growth. Serving clients in Texas, Florida, Idaho & South Carolina via telehealth.",
    heroImage: portrait,
    primaryCta: { label: "Free 15-minute consultation", href: CONSULT_URL },
    secondaryCta: { label: "Services offered", href: "/services" },

    whatToExpectHeading: "Take the First Step Toward Healing",
    whatToExpectIntro: "Finding the right therapist is important.",
    whatToExpectSteps: [
      {
        _key: "step1",
        icon: "🕊️",
        title: "A free 15-minute call",
        body: "We offer a free 15-minute phone consultation to discuss your needs, answer questions, and determine whether we are a good fit.",
      },
      {
        _key: "step2",
        icon: "🌿",
        title: "Your intake session",
        body: "If you decide to move forward, we will schedule an intake session to explore your history and identify goals.",
      },
      {
        _key: "step3",
        icon: "🌱",
        title: "A plan built for you",
        body: "We develop a personalized treatment plan tailored to your needs.",
      },
    ],

    aboutTeaserHeading: "About Brianne",
    aboutTeaserBody:
      "Brianne has advanced training and experience in perinatal mental health and supports individuals and families through every stage of the reproductive journey. She also specializes in supporting adults who are caring for aging parents, spouses, or relatives.",

    pricingHeading: "Brianne's Fees",
    pricingIntro:
      "15-minute phone consultation: free. Extended 60–75 minute sessions are $200, and 85+ minute sessions are $230. Payment is due at time of session; credit card or Zelle accepted.",
    sessionFee: "$150 per 50-minute session",
    insuranceNote:
      "All clinicians are out-of-network providers for all insurance companies. Licensed clinicians can gladly provide a superbill monthly if you wish to seek reimbursement and utilize available out-of-network benefits. Brianne also accepts Crime Victims Compensation and is a Kristi's List and Connect to Care voucher provider through Nurtured TX.",
    slidingScaleNote:
      "One sliding-scale spot at $115 per 50-minute session is currently available for those with financial hardship, for bi-weekly scheduled sessions. Spots are re-evaluated after 10 sessions and are not eligible for superbills.",

    modalities: [
      "Perinatal mental health",
      "Postpartum support",
      "Caregiver support",
      "Anxiety & stress",
      "Trauma",
      "Relationships & family",
      "EMDR",
      "Telehealth",
    ],
    showModalityDrift: true,
    showBreathingCircle: true,
    // The calm-band statement ("Nothing here needs to be forced. Not even
    // this.") is hardcoded in the component in the demo persona's somatic
    // voice — not Brianne's. Off rather than putting words in her mouth.
    showCalmBand: false,
  })
  .commit();

console.log("→ patching about page");
await client
  .patch("aboutPage")
  .set({
    heading: "About Brianne",
    intro:
      "Relationship Therapist, Supervisor, and Owner of Austin Women's Counseling. I take a relational and systemic approach to therapy combined with gentle, loving humor.",
    portrait,
    body: [
      para(
        "b1",
        "In today's world, many people do their best to balance \"having it all\" and struggle with their sense of self and managing relationships. I focus on working with individuals and families of all genders who are learning how to live an independent lifestyle and be fulfilled with life, whatever stage that might be. At times, as clients share their story, their triumphs, and debacles with life, visions or symbols formulate, which I describe as a way to help others better understand the situation.",
      ),
      para(
        "b2",
        "Much of my experience thus far has been with women's issues and families regarding relationship problems, sex, anger, anxiety, and depression and motherhood, including challenges with parents. I have a passion for working with clients supporting aging parents, especially those in the \"sandwich\" generation who also support young children or grandchildren. Additionally, I have a particular interest in working with inter-generational patterns and ancestral trauma. This background has helped to sustain a thriving practice since 2010.",
      ),
      para(
        "b3",
        "I help clients get out of their heads and understand where they are in their situations, as well as help heal through their problems by focusing on their strengths and goals. While I only see couples on a select basis at this time, I do have many referrals for wonderful practitioners who can help couples realign their paths.",
      ),
      para(
        "b4",
        "I am a 7th generation Texan who grew up in a military town and came to Austin for college. I've worked in a variety of jobs including retail, service industry, foster care, and even on movie sets — all lending itself to a desire to always learn more. In addition to being a worker bee, I am also a spouse, mama to 3 kiddos and an angel baby, and a caregiver to aging family. My favorite animals are cows and cats. When I am not working or supervising counselors coming into the field, I enjoy hanging out with my 3 kids, eating spicy food, relaxing in the country, and drinking coffee with a book.",
      ),
    ],
    credentials: [
      "LMFT-S — Licensed Marriage and Family Therapist, Supervisor",
      "LPC-S — Licensed Professional Counselor, Supervisor",
      "PMH-C — Certified Perinatal Mental Health Professional",
      "Certificate in Gerontological Counseling, Association for Adult Aging and Development",
      "EMDR basic training, with advanced coursework in traumatic stress and perinatal mental health",
    ],
    credentialBadges: [
      {
        ...imageRef(
          psiBadgeId,
          "Postpartum Support International — Certified Perinatal Mental Health Professional (PMH-C)",
        ),
        _key: "badge-psi",
      },
    ],
  })
  .commit();

console.log("→ patching services page");
await client
  .patch("servicesPage")
  .set({
    heading: "Services Offered",
    intro:
      "I help clients get out of their heads and understand where they are in their situations, as well as help heal through their problems by focusing on their strengths and goals.",
    services: [
      {
        _key: "svc-individual",
        _type: "service",
        icon: "🌿",
        title: "Individual and Adult Family Counseling",
        description:
          "At Austin Women's Counseling, we provide compassionate, confidential, and evidence-based therapy in a welcoming and inclusive environment. Our goal is to help clients understand their challenges, work through emotional pain, build resilience, and create lasting personal growth.",
      },
      {
        _key: "svc-perinatal",
        _type: "service",
        icon: "🌱",
        title: "Perinatal Mental Health",
        description:
          "The perinatal period is defined as the moment of conception through the first year of life. However, I believe that parenting can begin when someone is contemplating having a child, throughout the fertility journey and onward. My hope is to combine training, years of practice, and lived experience to create a nonjudgmental and loving space for families to process and grow.",
      },
      {
        _key: "svc-caregivers",
        _type: "service",
        icon: "🕯️",
        title: "Counseling for Caregivers and Aging Family Concerns",
        description:
          "I completed a certificate program in gerontological counseling from the Association for Adult Aging and Development to better serve the mental wellness for this growing population. This includes training specific to mood disorders and cognitive changes, substance use, grief and spirituality, and overall wellness. My hope in working with aging adults and their families is to bring meaning, peace, and understanding.",
      },
      {
        _key: "svc-teletherapy",
        _type: "service",
        icon: "🏡",
        title: "Teletherapy",
        description:
          "I am trained in providing video sessions, which are conducted through a fully HIPAA-secure tele-mental health platform from the comfort of your own space. I am happy to provide a superbill if your insurance plan covers out-of-network teletherapy. Available for Texas residents only. All sessions are virtual.",
      },
      {
        _key: "svc-emdr",
        _type: "service",
        icon: "🌊",
        title: "EMDR",
        description:
          "For those interested in managing trauma with a modality that assists traditional talk therapy, you may be interested in Eye Movement Desensitization and Reprocessing (EMDR). I have basic training with advanced coursework in ongoing traumatic stress and natural/man made disasters, as well as perinatal mental health. If this might be of interest, please let me know and we can explore together in the assessment.",
      },
      {
        _key: "svc-walkandtalk",
        _type: "service",
        icon: "🍃",
        title: "Walk and Talk Therapy",
        description:
          "I have a limited number of in-person walk and talk therapy sessions in Round Rock, TX. This is great for parents struggling with the demands and overwhelm of keeping everything going. I believe that working through emotions with motion is a vital key to wellness. Infants and toddlers up to 18 months are welcome in a stroller. Walk and talk options are subject to therapist assessment to ensure appropriateness of treatment.",
      },
    ],
  })
  .commit();

console.log("→ patching contact page");
await client
  .patch("contactPage")
  .set({
    heading: "Schedule Your Free 15-Minute Consultation",
    intro:
      "Contact us today to schedule your free consultation and begin your journey toward greater peace, confidence, and well-being. Please note, this practice is not in-network with insurance at this time. You may request a superbill for services to submit if your insurance allows for out-of-network billing.",
  })
  // Fabricated in the demo content: a fake office address, phone, and office
  // hours. Her scheduler is linked as a button rather than embedded, because
  // Google Calendar booking pages don't reliably allow iframing.
  .unset(["email", "phone", "addressLine", "hours", "schedulingUrl"])
  .commit();

console.log("→ deleting seeded demo content");
const demoIds = await client.fetch(
  `*[_type in ["testimonial", "post", "author", "category"]]._id`,
);
if (demoIds.length) {
  const tx = demoIds.reduce((t, id) => t.delete(id), client.transaction());
  await tx.commit();
}
console.log(`   removed ${demoIds.length} demo documents`);

console.log("✓ Migration complete.");
