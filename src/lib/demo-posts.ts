import type { PortableTextBlock } from "@portabletext/react";

import type {
  BlogIndexResult,
  PostDetail,
  PostListItem,
  RecentPost,
} from "@/sanity/types";

/**
 * HAVEN demo blog — five posts in Imani's slow-exhale voice: body-based,
 * permission-giving, never rushed. Defaults fallback now; Sanity seed later.
 */

let keyCounter = 0;
const key = () => `demo-${(keyCounter += 1)}`;

function para(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  } as PortableTextBlock;
}

function h2(text: string): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style: "h2",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  } as PortableTextBlock;
}

const AUTHOR = {
  _id: "demo-author",
  name: "Imani Brooks, LMFT",
  credentials: "LMFT · Somatic Experiencing Practitioner",
  photo: {
    demoUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=600&fit=crop&q=80",
    alt: "Imani Brooks",
  },
  bio: [
    para(
      "Imani is a trauma-informed somatic therapist in Austin. Her writing, like her sessions, moves at the body's pace — gentle, practical, and permission-giving from the first line."
    ),
  ],
};

function cat(title: string): { _id: string; title: string; slug: string } {
  return {
    _id: `demo-cat-${title}`,
    title,
    slug: title.toLowerCase().replace(/[^a-z]+/g, "-"),
  };
}

export const demoPosts: PostDetail[] = [
  {
    _id: "demo-post-1",
    title: "Your nervous system isn't broken — it's protective",
    slug: "your-nervous-system-isnt-broken",
    featuredImage: {
      demoUrl:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&h=960&fit=crop&q=80",
      alt: "Sunlight filtering through a forest path",
    },
    excerpt:
      "The racing heart, the shutdown, the snap to anger — these aren't malfunctions. They're an old, loyal security system doing its job with outdated information.",
    publishedAt: "2026-06-25",
    author: AUTHOR,
    categories: [cat("Nervous system")],
    body: [
      para(
        "So many people arrive in my office convinced something in them is defective. They startle too easily, or go numb at the worst times, or feel their chest tighten in perfectly safe rooms. Here is the reframe that changes everything: nothing in you is broken. Something in you is protecting."
      ),
      h2("An old, loyal guard"),
      para(
        "Your nervous system learned what danger felt like a long time ago, and it never forgets a lesson that once kept you safe. The trouble is that it errs on the side of caution — forever. It would rather sound a hundred false alarms than miss one real threat. That bias saved your ancestors. It also makes Tuesday staff meetings feel like emergencies."
      ),
      para(
        "Shutdown works the same way. Numbness, fog, the sense of watching your life from a distance — that's not absence. That's a circuit breaker, tripping on purpose, because once upon a time feeling everything was too much."
      ),
      h2("What healing actually is"),
      para(
        "We don't fight this system, and we certainly don't shame it. We update it. Slowly, through the body, we offer it new evidence: you can feel your feet on the floor and be safe. You can feel anger rise and let it move through. The guard doesn't need firing. It needs to be told, gently and repeatedly, that the war is over."
      ),
    ],
  },
  {
    _id: "demo-post-2",
    title: "A three-minute grounding practice for the worst moments",
    slug: "three-minute-grounding-practice",
    featuredImage: {
      demoUrl:
        "https://images.unsplash.com/photo-1476611317561-60117649dd94?w=1600&h=960&fit=crop&q=80",
      alt: "Smooth stones balanced in quiet water",
    },
    excerpt:
      "For the moments when everything is too loud, too fast, too much: a simple sequence you can do anywhere, no experience needed, no one even has to know.",
    publishedAt: "2026-06-11",
    author: AUTHOR,
    categories: [cat("Practices")],
    body: [
      para(
        "This is the practice I teach in first sessions, the one clients tell me they've used in parking lots and hallways and the middle of hard conversations. It asks three minutes of you. It works because it speaks the body's language, not the mind's."
      ),
      h2("The sequence"),
      para(
        "First minute: feet. Press them into the floor, actually feel the press. Notice the chair or the ground holding your weight — you don't have to hold yourself up right now; something is already doing it."
      ),
      para(
        "Second minute: breath, with a longer exhale. In for four, out for six. The exhale is the brake pedal of your nervous system — you're not forcing calm, you're just tapping the brake, gently, over and over."
      ),
      para(
        "Third minute: eyes. Let them wander the room and land on three things that are just… fine. A doorknob. A patch of light. Let your body register the ordinary, boring safety of the room you're actually in."
      ),
      h2("If it doesn't 'work'"),
      para(
        "Some days the volume only comes down ten percent. That still counts. Grounding isn't a light switch — it's a hand on the shoulder of a scared animal, and some days the animal needs longer. Be the patient hand anyway."
      ),
    ],
  },
  {
    _id: "demo-post-3",
    title: "Why talking isn't always enough after trauma",
    slug: "why-talking-isnt-always-enough",
    featuredImage: {
      demoUrl:
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&h=960&fit=crop&q=80",
      alt: "Mist drifting through a quiet forest",
    },
    excerpt:
      "You can understand your story perfectly and still flinch at the same sounds. Here's why insight alone doesn't reach the body — and what does.",
    publishedAt: "2026-05-28",
    author: AUTHOR,
    categories: [cat("Trauma")],
    body: [
      para(
        "A woman once told me she could narrate her own trauma like a documentary — dates, causes, insights, the works — and still couldn't sit with her back to a door. She'd done years of good, honest talking. So why was her body still bracing?"
      ),
      h2("Trauma lives below language"),
      para(
        "The brain regions that hold traumatic memory are older and deeper than the ones that hold words. When the alarm fires, it fires in sensation — heat, clench, freeze — long before the thinking mind gets a vote. You cannot always reason with a region that doesn't speak reason."
      ),
      para(
        "That's not a verdict on talk therapy; understanding matters, and being witnessed matters enormously. It's just incomplete for some nervous systems. The missing piece is usually the body itself."
      ),
      h2("Working from the bottom up"),
      para(
        "Somatic approaches start with sensation instead of story: noticing where the bracing lives, letting held survival energy finish the movement it never got to make, building the felt sense of safety in tiny, tolerable doses. The story often softens on its own afterward — because the body finally believes it's over."
      ),
    ],
  },
  {
    _id: "demo-post-4",
    title: "The window of tolerance, explained gently",
    slug: "window-of-tolerance-explained",
    featuredImage: {
      demoUrl:
        "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1600&h=960&fit=crop&q=80",
      alt: "Lavender field under a soft sky",
    },
    excerpt:
      "The kindest map I know for understanding your own reactions — why some days you can handle anything and other days a dropped spoon undoes you.",
    publishedAt: "2026-05-14",
    author: AUTHOR,
    categories: [cat("Nervous system")],
    body: [
      para(
        "Imagine a window. Inside it, you're present — you can think and feel at the same time, handle surprises, stay connected. Above the window is too much: panic, racing, rage. Below it is too little: numbness, fog, collapse. Every person alive moves between these zones. That's the whole map."
      ),
      h2("The window changes size"),
      para(
        "Sleep, pain, grief, hunger, anniversaries your body remembers before you do — all of these narrow the window. That's why the same email that rolls off you on Thursday can wreck you on Monday. You didn't get weaker. Your window got smaller, and the weather got in."
      ),
      para(
        "Trauma tends to narrow the window as a long-term setting. The good news — genuinely good — is that the window widens with practice. Every time you notice you've left it and find one small way back, you've done a repetition. The reps compound."
      ),
      h2("Using the map kindly"),
      para(
        "The point of this map is not self-monitoring perfection. It's self-blame reduction. 'I'm outside my window' is a kinder, truer sentence than 'I'm failing at being a person' — and unlike the second sentence, it comes with directions home."
      ),
    ],
  },
  {
    _id: "demo-post-5",
    title: "What EMDR actually feels like, from the chair",
    slug: "what-emdr-feels-like",
    featuredImage: {
      demoUrl:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&h=960&fit=crop&q=80",
      alt: "A calm seated moment in morning light",
    },
    excerpt:
      "No swinging pocket watches, no reliving everything at full volume. A gentle walkthrough of a real EMDR session — including the parts where nothing dramatic happens.",
    publishedAt: "2026-04-30",
    author: AUTHOR,
    categories: [cat("Trauma")],
    body: [
      para(
        "People arrive with two fears about EMDR: that it's hypnosis, or that it means drowning in the memory all over again. It's neither. Most of a session looks, from the outside, like two people sitting quietly while one of them follows a slow left-right rhythm — taps, tones, or my fingers crossing their vision."
      ),
      h2("A session, honestly"),
      para(
        "We spend real time preparing first — building grounding skills, agreeing on a stop signal you can use at any moment, choosing a target memory together. During processing, you touch the memory lightly, like a stone in your pocket, while the bilateral rhythm keeps one foot in the present. You are never sent back alone."
      ),
      para(
        "What clients report is strange and quiet: the memory starts to feel farther away. Same facts, less charge. 'It feels like it happened to me, instead of happening to me right now,' one person put it. The science is still working out exactly why. The outcomes research, meanwhile, is substantial."
      ),
      h2("The unglamorous truth"),
      para(
        "Some sessions are dramatic; many are gentle and slightly boring, and the change shows up later — you drive past the intersection and notice, a mile on, that you forgot to brace. Healing often arrives like that. Not as fireworks. As an absence of flinching."
      ),
    ],
  },
];

export const demoPostList: PostListItem[] = demoPosts.map(
  ({ body: _body, ...rest }) => rest
);

export const demoRecentPosts: RecentPost[] = demoPosts.slice(0, 3).map((p) => ({
  _id: p._id,
  title: p.title,
  slug: p.slug,
  featuredImage: p.featuredImage,
  publishedAt: p.publishedAt,
}));

export function demoBlogIndex(start: number, end: number): BlogIndexResult {
  return { posts: demoPostList.slice(start, end), total: demoPostList.length };
}

export function demoPostBySlug(slug: string): PostDetail | null {
  return demoPosts.find((p) => p.slug === slug) ?? null;
}

export function demoSimilar(slug: string): PostListItem[] {
  return demoPostList.filter((p) => p.slug !== slug).slice(0, 3);
}
