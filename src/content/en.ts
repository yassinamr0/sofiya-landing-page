import type { Content } from "./types";

// All English copy for the page, taken word for word from the reference sketch.
// Anything in [brackets] or marked `placeholder: true` is fake and must be
// replaced with real client material before launch.

// PLACEHOLDER: each "More results" photo; add photo: { src: "/media/results/more-1.jpg", alt: "…" }.
const clientPhoto = { label: "[Client photo]", placeholder: true } as const;

export const en: Content = {
  locale: "en",
  dir: "ltr",

  meta: {
    title: "Sofiya Validovna",
    description:
      "Six months of one-on-one coaching with Sofiya Validovna: daily WhatsApp check-ins, a weekly meeting and plans built for you.",
  },

  brand: {
    name: "Sofiya Validovna",
    instagram: {
      label: "Instagram",
      url: "https://www.instagram.com/",
      placeholder: true,
    },
  },

  apply: { label: "Apply now" },

  gate: {
    title: [["What are"], [{ text: "you?", mark: "outline" }]],
    subtitle: "Be honest. Pick one.",
    note: "Placeholder wording and visuals, to be decided.",
    options: {
      lose: { name: "3egl", ariaLabel: "3egl: I want to lose weight" },
      gain: { name: "Ma2asha", ariaLabel: "Ma2asha: I want to bulk up" },
    },
  },

  nav: { reset: "Pick again" },

  hero: {
    shout: [["Six months"], ["from now,"]],
    punch: [{ text: "you won't recognize yourself.", mark: "band" }],
    backdropNote: "Backdrop photos: placeholder",
    // PLACEHOLDER: photos of Sofiya, e.g. ["/media/backdrop/1.jpg", "/media/backdrop/2.jpg", …]; 6 or 12 fill the grid.
    backdropPhotos: [],
    playLabel: "Play the intro video",
    videoPendingNote: "The real intro video plays here.",
    // PLACEHOLDER: when the videos are hosted, add their links, e.g.
    // src: "https://<host>/intro-lose.m3u8" (or .mp4), poster: "https://<host>/intro-lose.jpg"
    video: {
      lose: { placeholderLabel: "Placeholder: weight-loss intro video" },
      gain: { placeholderLabel: "Placeholder: muscle-gain intro video" },
    },
    choose: {
      title: ["You don't have to ", { text: "choose us.", mark: "circle" }],
      body: "You have a hundred other options. Keep scrolling, keep comparing, keep waiting. Or take a real step.",
    },
  },

  contrast: {
    title: [
      "Most coaches change how you look. ",
      { text: "We change how you live.", mark: "band" },
    ],
    theirsLabel: "Most programs",
    oursLabel: "Here",
    rows: [
      {
        theirs: "A template plan, copied from a PDF",
        ours: "A plan built for you, changed whenever your life changes",
      },
      {
        theirs: "Silence for days",
        ours: "Daily check-ins. Send what you ate. Send everything.",
      },
      {
        theirs: "No real calls",
        ours: "A weekly meeting with Sofiya herself, and a call whenever you need help",
      },
      {
        theirs: "Only the body",
        ours: "Food, sleep, habits, the whole lifestyle",
      },
    ],
  },

  chats: {
    title: ["Other coaches go quiet. ", { text: "Sofiya doesn't.", mark: "outline" }],
    intro: "Here is what a normal Tuesday looks like.",
    theirs: {
      label: "Most programs",
      items: [
        { kind: "time", from: "client", text: "Mon 09:14" },
        { kind: "text", from: "client", text: "Hi, can you look at my meals this week?" },
        { kind: "text", from: "coach", text: "Here's your plan. plan_v1.pdf" },
        { kind: "time", from: "client", text: "Tue 20:40" },
        { kind: "text", from: "client", text: "Is it ok if I swap the rice?" },
        { kind: "time", from: "client", text: "Thu 18:02" },
        { kind: "text", from: "client", text: "Hello?" },
        { kind: "time", from: "client", text: "Sat 11:30" },
        { kind: "text", from: "client", text: "Are you still there?" },
      ],
      footnote: "No reply for 6 days",
    },
    ours: {
      lose: {
        label: "Here",
        items: [
          { kind: "time", from: "coach", text: "08:05" },
          { kind: "text", from: "coach", text: "Morning. Send me breakfast." },
          { kind: "photo", from: "client", label: "[photo: breakfast]", placeholder: true },
          {
            kind: "text",
            from: "coach",
            text: "Good. Dinner tonight is the one to watch, you have the work event.",
          },
          { kind: "time", from: "client", text: "21:10" },
          { kind: "text", from: "client", text: "Skipped the gym. Long day." },
          {
            kind: "text",
            from: "coach",
            text: "Fine. A 20 minute walk tomorrow after work and we stay on track. We talk Sunday.",
          },
        ],
        footnote: "Checked in daily",
      },
      gain: {
        label: "Here",
        items: [
          { kind: "time", from: "coach", text: "08:05" },
          { kind: "text", from: "coach", text: "Morning. What did you eat before training?" },
          { kind: "photo", from: "client", label: "[photo: pre-workout meal]", placeholder: true },
          {
            kind: "text",
            from: "coach",
            text: "Not enough. Add a banana and a bigger portion next time. You're not eating to maintain.",
          },
          { kind: "time", from: "client", text: "20:50" },
          { kind: "text", from: "client", text: "Squats felt heavy today." },
          {
            kind: "text",
            from: "coach",
            text: "Good, that's the point. Sleep early tonight. I'll adjust the plan on Sunday.",
          },
        ],
        footnote: "Checked in daily",
      },
    },
    disclaimer: "Illustrative conversations, not real clients.",
  },

  notTemplate: {
    // The highlight style for "template." is still open (a scribbled strike is an option).
    title: ["This is not a ", { text: "template.", mark: "circle" }],
    intro: "Every part of the program is built around one person, and that person is you.",
    items: [
      {
        icon: "chat",
        title: "Daily WhatsApp check-ins",
        body: "Show your meals, your day, everything. Someone is actually looking.",
      },
      {
        icon: "calendar",
        title: "A weekly meeting with Sofiya",
        body: "One-on-one. What you ate, what to fix, how your habits are holding up.",
      },
      {
        icon: "sliders",
        title: "Plans that change with you",
        body: "Workout and food plans built for you, and rebuilt whenever your life changes.",
      },
      {
        icon: "layers",
        title: "Extra plans for specific goals",
        body: "Sleep, a specific muscle group, and more, on top of your main plan.",
      },
      {
        icon: "phone",
        title: "Call your coach for any help",
        body: "Stuck or confused? Call. You get full access, not a support inbox.",
      },
    ],
  },

  results: {
    title: ["Results, ", { text: "not promises.", mark: "circle" }],
    testimonials: [
      {
        // PLACEHOLDER: add photo: { src: "/media/results/<name>.jpg", alt: "<name> before and after" }
        media: { kind: "photo", label: "[BEFORE / AFTER PHOTO]" },
        name: "[Client first name]",
        result: "[X kg in Y weeks]",
        quote: "[Real testimonial, in the client's own words]",
        placeholder: true,
      },
      {
        // PLACEHOLDER: add photo: { src: "/media/results/<name>.jpg", alt: "<name> before and after" }
        media: { kind: "photo", label: "[BEFORE / AFTER PHOTO]" },
        name: "[Client first name]",
        result: "[X kg in Y weeks]",
        quote: "[Real testimonial, in the client's own words]",
        placeholder: true,
      },
      {
        // PLACEHOLDER: add video: { src: "https://<host>/<name>.mp4", poster: "/media/results/<name>-poster.jpg" }
        media: { kind: "video", label: "[CLIENT VIDEO TESTIMONIAL]" },
        name: "[Client first name]",
        result: "[X kg in Y weeks]",
        quote: "[Real testimonial, in the client's own words]",
        placeholder: true,
      },
    ],
    moreTitle: "More results",
    more: Array.from({ length: 10 }, () => clientPhoto),
  },

  objections: {
    title: ["You might be ", { text: "thinking...", mark: "outline" }],
    items: [
      {
        doubt: "“I've had coaches before. They disappeared.”",
        answer:
          "Daily check-ins on WhatsApp and a weekly one-on-one with Sofiya herself. You hear from a person, not a template.",
        proof: "[Client who said the same: X kg in Y weeks]",
      },
      {
        doubt: "“My life is too unpredictable for a strict plan.”",
        answer:
          "Good, because the plan isn't strict. It's built around your actual week and rebuilt when your week changes.",
        proof: "[Client who said the same: X kg in Y weeks]",
      },
      {
        doubt: "“I'm starting from zero.”",
        answer: "Then the plan starts exactly where you are, and changes as you do.",
        proof: "[Client who said the same: X kg in Y weeks]",
      },
      {
        doubt: "“I don't know if it will work for me.”",
        answer:
          "Nothing is copied from someone else's plan. Food, training, sleep and specific muscle goals are all set up for you.",
        proof: "[Client who said the same: X kg in Y weeks]",
      },
    ],
  },

  fit: {
    title: ["Who this is for. ", { text: "And who it isn't.", mark: "outline" }],
    forYou: {
      title: "For you if...",
      items: [
        "You're done restarting every Monday",
        "You want someone who actually checks on you, every day",
        "You want a plan that changes when your life does",
        "You're ready to commit to six months, not six days",
        "You want to change your habits, not only your body",
      ],
    },
    notForYou: {
      title: "Not for you if...",
      items: [
        "You want a quick fix or a magic plan",
        "You'd rather get a PDF and be left alone",
        "You won't send your meals or check in",
        "You expect results without effort",
      ],
    },
  },

  finalCta: {
    title: ["Ready to take ", { text: "the step?", mark: "band" }],
    note: "Takes 2 minutes. We'll reach out on Instagram.",
  },

  footer: { name: "Sofiya Validovna", instagramPlaceholderNote: "(placeholder link)" },
};
